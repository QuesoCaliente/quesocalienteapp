import MessageBox from "@/components/ui/Buttons/MessageBox.astro";
import AudioPlayer from "@/components/ui/Video/AudioPlayer.astro";
import YoutubeVideo from "@/components/ui/Video/YoutubeVideo.astro";

export const customComponents = {
  MessageBox: MessageBox,
  YoutubeVideo: YoutubeVideo,
  AudioPlayer: AudioPlayer,
};
