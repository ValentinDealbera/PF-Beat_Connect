import { BeatCardGrid, Section } from "@/components"
import { beats } from "@/data/fakeDB"


export default function BeatShopSection() {
    return(
        <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo5 flex flex-col">
            <BeatCardGrid beats={beats} />
        </Section>
    )
}