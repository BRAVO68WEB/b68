export default class VSCodeService {
    public list = () => {
        return [
            {
                id: 'vscode-uipack',
                extentionPack: true,
                name: "Bravo's UI pack",
                description: 'VSCode UI Pack created by Bravo68web',
                links: [
                    {
                        platform: 'vs-marketplace',
                        link: 'https://marketplace.visualstudio.com/items?itemName=Bravo68web.vector-vscode-devpack',
                    },
                    {
                        platform: 'open-vsx',
                        link: 'https://open-vsx.org/extension/bravo68web/vscode-uipack',
                    },
                ],
            },
            {
                id: 'icyicons',
                extentionPack: false,
                name: 'Icy icons',
                description: 'Crystalify all your VSCode Icons.',
                links: [
                    {
                        platform: 'vs-marketplace',
                        link: 'https://marketplace.visualstudio.com/items?itemName=Bravo68web.icyicons',
                    },
                    {
                        platform: 'open-vsx',
                        link: 'https://open-vsx.org/extension/bravo68web/icyicons',
                    },
                ],
            },
            {
                id: 'propstar',
                extentionPack: false,
                name: 'A multivariant VS-Code Theme build with ❤️. All theme designs and colour combinations are handpicked to suit every Programmers needs. Hope you love it.',
                links: [
                    {
                        platform: 'vs-marketplace',
                        link: 'https://marketplace.visualstudio.com/items?itemName=Bravo68web.propstar',
                    },
                    {
                        platform: 'open-vsx',
                        link: 'https://open-vsx.org/extension/bravo68web/propstar',
                    },
                ],
            },
            {
                id: 'vector-vscode-devpack',
                extentionPack: true,
                name: 'Feature Rich VSCode Extension Pack created by Bravo68web',
                links: [
                    {
                        platform: 'vs-marketplace',
                        link: 'https://marketplace.visualstudio.com/items?itemName=Bravo68web.vector-vscode-devpack',
                    },
                    {
                        platform: 'open-vsx',
                        link: 'https://open-vsx.org/extension/bravo68web/vector-vscode-devpack',
                    },
                ],
            },
        ]
    }
}
