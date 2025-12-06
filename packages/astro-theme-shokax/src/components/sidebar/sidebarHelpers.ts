/**
 * Sidebar behavior utilities
 * Migrated from old_project/hexo-theme-shokaX/source/js/_app/components/sidebar.ts
 */

/**
 * Handle TOC (Table of Contents) navigation
 * Updates active TOC items based on scroll position using IntersectionObserver
 */
export function initSidebarTOC(sidebarElement: HTMLElement | null) {
  if (!sidebarElement)
    return

  const contentsPanel = sidebarElement.querySelector('.contents.panel')
  if (!contentsPanel)
    return

  const navItems = contentsPanel.querySelectorAll<HTMLElement>('li')
  if (navItems.length < 1)
    return

  let sections: (HTMLElement | null)[] = []
  let activeLock: number | null = null

  // Define activateNavByIndex first since it will be used in scrollToSection
  const activateNavByIndex = (index: number): void => {
    const target = navItems[index]
    if (!target)
      return

    if (target.classList.contains('current'))
      return

    // Clear previous active items
    contentsPanel.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active', 'current')
    })

    sections.forEach((element) => {
      element?.classList.remove('active')
    })

    // Set current active
    target.classList.add('active', 'current')
    sections[index]?.classList.add('active')

    // Update parent items
    let parent = target.parentNode as Element
    while (parent && !parent.matches('.contents')) {
      if (parent.matches('li')) {
        parent.classList.add('active')
      }
      parent = parent.parentNode as Element
    }

    // Scroll TOC into view if needed
    if (contentsPanel.classList.contains('active')) {
      const offsetTop = target.offsetTop - contentsPanel.clientHeight / 4
      contentsPanel.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  // Map TOC items to their corresponding heading elements
  sections = Array.from(navItems).map((element) => {
    const link = element.querySelector('a.toc-link')
    if (!link)
      return null

    const linkHref = link.getAttribute('href')
    if (!linkHref)
      return null

    const anchor = document.getElementById(decodeURI(linkHref.replace('#', '')))
    if (!anchor)
      return null

    const alink = anchor.querySelector('a.anchor')

    // Handle scroll to section
    const scrollToSection = (target: HTMLElement, index: number) => {
      activeLock = index
      const scrollTop = target.offsetTop - 100 // Add offset for fixed header
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      })

      // Update active item after scroll
      setTimeout(() => {
        activateNavByIndex(index)
        activeLock = null
      }, 600)
    }

    // TOC item click handler
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const targetId = (link as HTMLAnchorElement).getAttribute('href')?.replace('#', '')
      if (targetId) {
        const target = document.getElementById(decodeURI(targetId))
        if (target)
          scrollToSection(target, Array.from(navItems).indexOf(element))
      }
    })

    // Anchor link click handler (copy link to clipboard)
    alink?.addEventListener('click', (event) => {
      event.preventDefault()
      const href = (event.currentTarget as HTMLElement).getAttribute('href') || ''
      const url = `${window.location.origin}${window.location.pathname}${href}`
      navigator.clipboard.writeText(url).catch(() => {
        console.warn('Failed to copy URL to clipboard')
      })
    })

    return anchor as HTMLElement
  })

  // Find closest visible section based on scroll position
  const findIndex = (entries: IntersectionObserverEntry[]): number => {
    let index = 0
    let entry = entries[index]

    if (entry && entry.boundingClientRect.top > 0) {
      index = sections.indexOf(entry.target as HTMLElement)
      return index === 0 ? 0 : Math.max(0, index - 1)
    }

    for (; index < entries.length; index++) {
      if (entries[index].boundingClientRect.top <= 0) {
        entry = entries[index]
      }
      else {
        return Math.max(0, sections.indexOf(entry.target as HTMLElement))
      }
    }

    return Math.max(0, sections.indexOf(entry?.target as HTMLElement))
  }

  // Setup IntersectionObserver for headings
  const observer = new IntersectionObserver(
    (entries) => {
      if (activeLock === null) {
        const index = findIndex(entries)
        activateNavByIndex(index)
      }
    },
    {
      rootMargin: '0px 0px -100% 0px',
      threshold: 0,
    },
  )

  sections.forEach((element) => {
    if (element)
      observer.observe(element)
  })
}

/**
 * Handle sidebar tab switching
 * Dynamically creates tabs for multiple panels
 */
export function initSidebarTabs(sidebarElement: HTMLElement | null) {
  if (!sidebarElement)
    return

  const sideBarInner = sidebarElement.querySelector('.inner')
  if (!sideBarInner)
    return

  // Remove existing tab if present
  const existingTab = sideBarInner.querySelector('.tab')
  if (existingTab) {
    sideBarInner.removeChild(existingTab)
  }

  const list = document.createElement('ul')
  list.className = 'tab'
  let activeCount = 0

  const panelNames = ['overview', 'related', 'contents']
  panelNames.forEach((itemName) => {
    const element = sidebarElement.querySelector(`.panel.${itemName}`)
    if (!element || element.innerHTML.trim().length < 1) {
      return
    }

    const tab = document.createElement('li')
    const span = document.createElement('span')
    const text = document.createTextNode(element.getAttribute('data-title') || itemName)
    span.appendChild(text)
    tab.appendChild(span)
    tab.classList.add(itemName)
    tab.classList.add('item')

    // Set first panel as active
    if (activeCount === 0) {
      element.classList.add('active')
      tab.classList.add('active')
    }
    else {
      element.classList.remove('active')
    }
    activeCount++

    // Tab click handler
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active'))
        return

      // Remove active from all
      sidebarElement.querySelectorAll('.tab .item').forEach((el) => {
        el.classList.remove('active')
      })

      sidebarElement.querySelectorAll('.panel').forEach((el) => {
        el.classList.remove('active')
      })

      // Add active to clicked
      sidebarElement.querySelector(`.panel.${itemName}`)?.classList.add('active')
      tab.classList.add('active')
    })

    list.appendChild(tab)
  })

  // Insert tabs if multiple panels exist
  if (list.childNodes.length > 1) {
    sideBarInner.insertBefore(list, sideBarInner.childNodes[0])
    const panelsElement = sidebarElement.querySelector('.panels') as HTMLElement
    if (panelsElement)
      panelsElement.style.paddingTop = ''
  }
  else {
    const panelsElement = sidebarElement.querySelector('.panels') as HTMLElement
    if (panelsElement)
      panelsElement.style.paddingTop = '0.625rem'
  }
}

/**
 * Activate menu items based on current page URL
 */
export function initMenuActive() {
  document.querySelectorAll('.menu .item:not(.title)').forEach((element) => {
    const target = element.querySelector('a[href]') as HTMLAnchorElement | null
    const parentItem = element.parentNode?.parentNode as HTMLElement | null

    if (!target)
      return

    const isSamePath
      = target.pathname === location.pathname
        || target.pathname === location.pathname.replace('index.html', '')

    const isSubPath
      = location.pathname.startsWith(target.pathname)
        && target.pathname !== '/'

    const isActive = target.hostname === location.hostname && (isSamePath || isSubPath)

    element.classList.toggle('active', isActive)

    if (element.parentNode && parentItem?.classList.contains('dropdown')) {
      if (element.parentNode.querySelector('.active')) {
        parentItem.classList.remove('active')
        parentItem.classList.add('expand')
      }
      else {
        parentItem.classList.remove('expand')
      }
    }
  })
}

/**
 * Toggle sidebar visibility (mobile)
 */
export function toggleSidebarVisibility(
  sidebarElement: HTMLElement | null,
  force?: boolean,
) {
  if (!sidebarElement)
    return

  const isOpen = sidebarElement.classList.contains('open')

  if (isOpen || force === false) {
    sidebarElement.classList.remove('open')
  }
  else {
    sidebarElement.classList.add('open')
  }
}
