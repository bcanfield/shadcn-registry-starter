import { getBlock } from "@/lib/blocks"
import { BlockPreview } from "@/components/block-preview"

export async function BlockDisplay({ name }: { name: string }) {
  
  const block = await getBlock(name)
  const hasLiftMode = block?.chunks ? block?.chunks?.length > 0 : false

  // Cannot (and don't need to) pass to the client.
  delete block?.component
  delete block?.chunks

  // return {
  //   ...block,
  //   hasLiftMode,
  // }


return (    <BlockPreview key={`${block.name}`} block={{
  ...block,
  hasLiftMode,
}} />
)
}
