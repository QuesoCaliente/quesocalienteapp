---
title: "Automatiza tu Web en Astro con n8n: Mi Experiencia"
description: "Aprende cómo automatizar la publicación de recursos en un blog creado con Astro utilizando n8n y un bot de Discord."
category: "Automatización"
createdAt: "2025-08-16"
updatedAt: "2025-08-16"
image: https://cdn.quesocaliente.dev/blog/automatizar-n8n-astro.png
author: queso
tags: ["astro", "n8n", "automatización", "discord", "github"]
---

# Automatiza tu Web en Astro con n8n: Mi Experiencia Paso a Paso

Si alguna vez has querido **automatizar procesos en tu web sin gastar dinero**, este tutorial es para ti.

En esta guía no me voy a detener en cómo instalar **n8n** (para eso ya existen muchos tutoriales). Lo que quiero es mostrarte **cómo logré automatizar la publicación de entradas en un blog creado con Astro**, lo que me facilita muchísimo subir recursos para desarrolladores de manera rápida y sin tanto tiempo perdido en crear el archivo en github y subirlo.

---

## Content Collections en Astro

Astro cuenta con un sistema llamado **Content Collections**, que permite organizar el contenido estático en carpetas dentro del proyecto. Entre sus ventajas destacan:

- Tipado automático para el contenido.
- Organización clara y estructurada.
- Integración sencilla con el flujo de empaquetado de la aplicación.

El problema: cada vez que quería publicar un recurso debía crear manualmente el archivo Markdown y subirlo al repositorio. Esto hacía que el proceso fuera lento y poco práctico para la web donde comparto recursos.

La solución: **automatizar la subida de contenido usando un bot de Discord + n8n**.

---

## Flujo General

El diagrama resume cómo funciona el sistema:

1. En Discord envío un comando con la información del recurso.
2. El bot procesa los datos y los envía mediante un **Webhook de n8n**.
3. n8n recibe la información, la transforma y genera una **issue en GitHub**.
4. Una Github Action genera la PR si existe una issue con cierta etiqueta.
5. Finalmente, recibo una notificación en Discord de que la issue fue creada.

![shapes](https://cdn.quesocaliente.dev/blog/shapes_at_25-08-13_00.54.33.png)

---

## Bot de Discord

n8n no tiene un **trigger nativo** para mensajes de Discord.  
Por eso decidí crear un bot con **discord.js** que recibe los comandos y los envía a n8n a través de un **Webhook**.

Generé un comando `/resource` que solicita 3 parámetros:

- **URL** → enlace del recurso.
- **Categoría** → opcional, seleccionada de una lista.
- **Keywords** → palabras clave separadas por comas.

Con la URL extraigo una imagen de previsualización y finalmente envío toda la información al **Webhook de n8n**.

![comando](https://cdn.quesocaliente.dev/blog/imagen.png)

---

### Ejemplo del Comando `/resource`

```jsx
export default {
  name: "resource",
  description: "Genera un recurso para AssetBox 2",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "url",
      description: "URL del recurso",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "category",
      description: "Categoría del recurso",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: categories.map((cat) => ({ name: cat, value: cat })),
    },
    {
      name: "keywords",
      description: "Palabras clave separadas por coma",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  execute: async (_client, interaction) => {
    const url = interaction.options.getString("url");
    const category = interaction.options.getString("category");
    const keywords = interaction.options
      .getString("keywords")
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    await interaction.deferReply();
    try {
      const info = await getLinkPreview(url!);

      // Subir imagen al bucket
      const imageResponse = await fetch(info.image);
      const buffer = Buffer.from(await imageResponse.arrayBuffer());
      const image = await subirArchivo({
        bucket: process.env.R2_BUCKET_NAME!,
        key: `${info.slug}.png`,
        body: buffer,
        contentType: "image/png",
      });

      // Enviar a n8n
      await fetch(process.env.N8N_WEBHOOK!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: info.title,
          url: info.url,
          image,
          slug: info.slug,
          category: category ?? "-",
          keywords: keywords ?? [],
          discord_user: interaction.user.id,
          owner_id: process.env.OWNER_ID,
        }),
      });

      await interaction.editReply({ content: "✅ Recurso enviado para revisión" });
    } catch (error) {
      console.error("Error al generar el recurso:", error);
      await interaction.editReply({
        embeds: [
          {
            title: "❌ Error",
            description: "Ocurrió un error generando el recurso.",
            color: 0xff0000,
          },
        ],
      });
    }
  },
};
```

Lo clave aquí es la parte donde enviamos el POST al Webhook de n8n:

```jsx
await fetch(process.env.N8N_WEBHOOK!, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...datos }),
});
```

---

## Flujo en n8n

Mi flujo en n8n está compuesto por los siguientes pasos:

1. **Webhook** → recibe la data enviada desde Discord.
2. **Edit Fields** → transforma la información y ajusta el formato.
3. **GitHub Node** → crea una _issue_ en el repositorio con el recurso.
4. **Discord Node** → envía una notificación a mi canal para avisar que la issue fue creada.

![flujo](https://cdn.quesocaliente.dev/blog/imagen%201.png)  
![edit fields](https://cdn.quesocaliente.dev/blog/imagen%202.png)  
![github issue](https://cdn.quesocaliente.dev/blog/imagen%203.png)

Github Action que genera la PR

```
name: Crear PR desde Issue con etiqueta

permissions:
  contents: write
  pull-requests: write

on:
  issues:
    types: [labeled]

jobs:
  create-pr:
    if: contains(github.event.issue.labels.*.name, 'auto-pr')
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repo
      uses: actions/checkout@v3

    - name: Crear archivo JSON desde body del issue
      run: |
        mkdir -p src/content/resource
        echo '${{ github.event.issue.body }}' > temp_body.json
        slug=$(jq -r '.slug' temp_body.json)
        echo '${{ github.event.issue.body }}' > src/content/resource/${slug}.json
        rm temp_body.json

    - name: Crear PR
      uses: peter-evans/create-pull-request@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        branch: issue-${{ github.event.issue.number }}
        commit-message: "Añadir archivo desde issue #${{ github.event.issue.number }}"
        title: "PR automática issue #${{ github.event.issue.number }}"
        body: "PR creada automáticamente a partir del issue #${{ github.event.issue.number }}"
        base: main
```

![discord notify](https://cdn.quesocaliente.dev/blog/imagen%204.png)

---

## Próximos pasos y mejoras

Este flujo puede mejorar mucho.  
Algunas ideas:

- Crear la **Pull Request directamente** en lugar de una issue.
- Permitir **subida directa de archivos** (útil cuando otros envíen recursos).
- Integrar **IA en el flujo** (ejemplo: generar descripciones automáticamente).

Aun así, lo aprendido con este primer flujo ya me permitió ahorrar bastante tiempo.

---

## Conclusión

n8n es una herramienta muy poderosa. Con un poco de creatividad puedes:

- Integrar servicios como Gmail, Google Drive o Discord.
- Automatizar publicaciones, notificaciones o flujos de trabajo.
- Reducir pasos manuales que te consumen tiempo.

Si quieres empezar, te recomiendo este [tutorial para instalar n8n gratis con Render + Supabase](https://medium.com/@valeriamelly2410/c%C3%B3mo-instalar-n8n-gratis-con-render-y-supabase-b34c339c8652).

En mi caso, actualmente corro todo en **Railway** (bot de Discord, n8n y base de datos Postgres). Si prefieres algo gratuito, Render es una buena alternativa.

👉 Con este flujo ya tengo una forma más **sencilla, automatizada y escalable** de publicar recursos en mi web hecha con Astro.

## Recursos adicionales

- [Documentación de n8n](https://docs.n8n.io/)
- [Ejemplos de flujos en n8n](https://n8n.io/examples)
- [Bot de Discord que ejecuta el comando](https://github.com/QuesoCaliente/V0MT)
- [Plantillas de n8n](https://n8n.io/templates)
- [Descargar mi Flujo de Trabajo](https://cdn.quesocaliente.dev/blog/Publicar%20Recurso%20en%20AssetBox%20por%20Discord.json)
