import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { fetch } from "undici"

const root = path.dirname(fileURLToPath(import.meta.url))
const src_root = path.join(root, "src")

let url_changes = "https://raw.githubusercontent.com/SyndiShanX/Update-Classes/main/Changes.txt"
if (process.argv.length > 2)
    url_changes = process.argv[2]

;(async () => {
    const r = await fetch(url_changes)
    const changes_txt = await r.text()
    const class_num = changes_txt.split("\n").length - 1
    const changes_split = changes_txt.split("\n")

    function update_file(raw) {
        let i = 0
        while (i < class_num) {
            const class1 = changes_split[i].split("\r")[0]
            const class2 = changes_split[i + 1].split("\r")[0]
            raw = raw.replaceAll(class1, class2)
            i = i + 2
        }
        return raw
    }

    const all_files = fs.readdirSync(src_root, { withFileTypes: true, recursive: true }).filter(d => !d.isDirectory())
    all_files.forEach(f => {
        if (!f.name.startsWith("_"))
            return

        const p = path.join(f.parentPath, f.name)
        console.log(`Updating ${p}`)
        const raw = fs.readFileSync(p).toString()
        const out = update_file(raw)
        fs.writeFileSync(p, out)
    })
})()
