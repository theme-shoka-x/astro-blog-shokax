# Astro Blog ShokaX

这是 [Hexo Theme ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX) 在 Astro 上的重构版本，使用 Astro + Svelte 5 + UnoCSS 技术栈

本项目建议使用 [Bun](https://bun.sh/) 运行，不保证与 Nodejs 的兼容性

您可以直接将本仓库 Clone 到本地或者创建一个 Fork（并为我们点一个 Star 😜），我们建议使用后者，这样在我们发布更新时您可以更轻松地迁移到新版本。
然后进入如下操作：
```bash
bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build
```

本仓库自带`vercel.json`和`netlify.toml`以提供在对应平台上的安全性与缓存优化，您可以直接将本仓库部署到相关平台上

## 备注

### 有关资源与许可证说明

- 本项目的主要样式与设计理念来自 [Shoka](https://github.com/amehime/hexo-theme-shoka)，但本项目为独立实现，仅在设计理念与风格上受到启发，出于致敬目的，在`license`目录下放置 Shoka 的原始 MIT 许可证(LICENSE-shoka)
- 本项目是 [Hexo ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX) 的独立自研重写版本，未直接使用其代码与资源，为独立实现，且本仓库由 ShokaX 项目团队直接维护，与 Hexo ShokaX 作者相同，所以本项目使用 ShokaX 作为项目名称
- 本项目中默认的 avatar 图片为 [QuAn\_](https://www.pixiv.net/users/6657532) 的作品，本项目中该图片仅用于展示，版权归原作者所有，用户需自行确认使用合规性，请在正式部署前使用版权可控的图片替换本图片
- 本项目使用了 [Maple Mono](https://font.subf.dev/zh-cn/) 和[霞鹜文楷](https://github.com/lxgw/LxgwWenKai) 作为项目的默认字体，两款字体均为 OFL 1.1 许可证，其分发许可证分别为`licenses/LICENSE-maple-mono.txt`和`licenses/OFL.txt`
  本项目在构建过程中会在遵从 OFL 1.1 许可证的前提下对字体进行子集化、格式转换与压缩
- 本项目本身（即根目录下的`LICENSE`）只适用于本项目中的代码资源，对于不包含于上述内容中的其他未标明或未知的非代码资产，本项目本身的 LICENSE 不适用，应视为原作者保留所有权

### 致谢

ShokaX 开发组向所有 ShokaX 在过去、现在和未来的使用过与可能使用的开源项目与所有 ShokaX 的用户、贡献者和开发者致谢，如果没有他们的支持，我们不可能构建出 ShokaX

其中，这些项目为我们的开发做出了极大的支持，特此再次致谢（随机排列，不分先后）：

- [Astro](https://astro.build/)：本项目的基石
- [UnoCSS](https://unocss.dev/)：现代化的原子 CSS 引擎，彻底解决了在前作中困扰开发组很长时间的图标问题
- [Svelte](https://svelte.dev/)：本项目的前端 UI 框架，个人博客项目的理想之选
- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki)：直接启发了开发组进行 Astro 迁移，为我们的迁移提供了极好的榜样
- [Bun](https://bun.sh/)：本项目使用的运行时，高性能而易用
- [Vercel](https://vercel.com/)：驱动了本项目的有关网站和 API 系统
- [Shoka](https://github.com/amehime/hexo-theme-shoka)：ShokaX 的起源，没有 Shoka 便不可能有 ShokaX
