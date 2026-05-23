import { Button } from "./ui/button"
import { UserPlus, Share, Check } from 'lucide-react'
import { useState } from 'react';

export default function FollowShareComponent({ podcastTitle = "this podcast" }) {

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // 1. Try to use the OS Native Share (Great for Mobile/Safari)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Listen to ${podcastTitle} on Sonar`,
          text: `Check out ${podcastTitle}!`,
          url: url,
        });
        return; // Stop here if native share works
      } catch (err) {
        console.log("Native share canceled or failed", err);
        return;
      }
    }

    // 2. Fallback: Copy to Clipboard (Great for Chrome Desktop)
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };
  return (
    <section className="w-[30rem] flex flex-col p-10 gap-8">
      <Button className="bg-[var(--color-sidebar-accent-foreground)] text-md p-6 ">
        <UserPlus className="w-[2rem]! h-[1.5rem]!" />
        Follow Podcast
      </Button>
      <Button className="bg-forground text-black text-md p-6" variant={"outline"} onClick={handleShare} >
        {
          !copied ?
            <Share className="w-[2rem]! h-[1.5rem]!" />
            :
            <Check className="w-[2rem]! h-[1.5rem]!" />
        }
        Share Podcast</Button>
    </section>
  )
}
