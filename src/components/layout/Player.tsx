import { AspectRatio } from "@chakra-ui/react";
import { DefaultUi, Player as VimePlayer, Youtube } from "@vime/react";

interface PlayerProps {
  videoId: string;
}

export default function Player({ videoId }: PlayerProps) {
  return (
    <AspectRatio h="100%" w="100%" maxW="1100px" maxH="80vh" ratio={16 / 9}>
      <VimePlayer>
        <Youtube videoId={videoId} />
        <DefaultUi />
      </VimePlayer>
    </AspectRatio>
  );
}
