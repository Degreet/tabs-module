function makeTabs(selector) {
    const el = document.querySelector(selector)
    if (!el) return
    
    const tabBodies = document.createElement('div')
    tabBodies.className = 'bodies'
    tabBodies.append(...el.children)

    const tabs = document.createElement('div')
    tabs.className = 'tabs'
    for (const body of tabBodies.children) {
        const tab = document.createElement('h3')
        body.className = 'tab-body'
        body.hidden = true
        tab.innerText = body.title || 'tab'
        body.title = ''
        tabs.append(tab)
    }
    
    tabs.firstChild.classList.add('active')
    tabBodies.firstChild.hidden = false
    el.append(tabs, tabBodies)


    tabs.onclick = function (e) {
        if (e.target.tagName == 'H3' && !e.target.classList.contains('active')) {
            const currentTab = this.querySelector('.active')
            currentTab?.classList.remove('active')
            e.target.classList.add('active')
    
            tabBodies.children[[...tabs.children].indexOf(currentTab)].hidden = true
            tabBodies.children[[...tabs.children].indexOf(e.target)].hidden = false
        }
    }

    const tabControl = {
        add: (el) => {
            if (typeof el == 'string') {
                try {
                    const div = document.createElement('div')
                    div.innerHTML = el

                    const tab = document.createElement('h3')
                    const body = div.firstChild instanceof Text ? div : div.firstChild

                    body.className = 'tab-body'
                    body.hidden = true
                    tab.innerText = body.title || 'tab'
                    body.title = ''

                    tabBodies.append(body)
                    tabs.append(tab)
                } catch {
                    console.error('Incorrect tab markup')
                }
            } else if (el instanceof HTMLElement) {
                const tab = document.createElement('h3')
                const body = el
                body.className = 'tab-body'
                body.hidden = true
                tab.innerText = body.title || 'tab'
                body.title = ''

                tabBodies.append(body)
                tabs.append(tab)
            } else console.error('Incorrect tab content')
            return tabs.length
        },

        remove: i => {
            if (tabs.children[i].classList.contains('active')) {
                tabs.children[i].className = ''
                tabBodies.children[i]?.remove()
                tabs.children[i]?.remove()
                tabs.children[0]?.classList.add('active')
                tabBodies.children[[...tabs.children].indexOf(tabs.children[0])].hidden = false
            } else {
                tabBodies.children[i]?.remove()
                tabs.children[i]?.remove()
            }
        }
    }

    return tabControl
}