const query = (() => {

    function $(...args) {

        const obj = new $query(args)

        Array.from(obj.arguments).forEach(arg => {

            if (typeof arg === 'string') {
                // if is a selector
                obj.nodes = obj.nodes.concat(Array.from(document.querySelectorAll(arg)))
            
            } else if (arg.length) {
                // if multiple nodes
                obj.nodes = obj.nodes.concat(arg)
            
            } else if (typeof arg === 'object') {

                if (!arg.nodes) {
                    // if single node
                    obj.nodes.push(arg)
                
                } else {
                    // if query object
                    obj.nodes = obj.nodes.concat(arg.nodes)
                }
            }
        })

        obj.nodes = uniq(obj.nodes)

        return obj
    }

    // === css, addClass, removeClass, hasClass

    const VENDORS = {
        'flex': ['-ms-flex', '-webkit-flex'],
        'transition': ['-webkit-transition', '-o-transition']
    }

    $query.prototype.css = function (obj) {

        this.nodes.forEach(el => {
            Object.keys(obj).forEach(property => {

                if (VENDORS[property]) {
                    VENDORS[property].forEach(property => {
                        el.style[property] = obj[property]
                    })
                }

                el.style[property] = obj[property]
            })
        })
        return this
    }


    $query.prototype.addClass = function (className) {

        this.nodes.forEach(el => {
            if (el.classList) {
                el.classList.add(className)
            } else {
                el.className += ` ${className}`
            }
        })

        return this
    }

    $query.prototype.removeClass = function (className) {

        this.nodes.forEach(el => {
            if (el.classList) {
                el.classList.remove(className)
            } else {
                el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ')
            }
        })

        return this
    }

    $query.prototype.hasClass = function (className) {

        let ans = false
        this.nodes.forEach(el => {
            if (el.classList) {
                ans = el.classList.contains(className)
            } else {
                ans = new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className)
            }
        })
        return ans
    }

    $.createElement = (innerHTML) => {
        var el = document.createElement('DIV')
        el.innerHTML = innerHTML
        el = el.children[0]
        return el
    }

    function $query(args) {
        this.arguments = args
        this.nodes = []
    }

    function uniq(nodes) {
        return nodes.reduce((a, b) => {
            if (a.includes(b) === false) a.push(b)
            return a
        }, [])
    }

    return $
})()

export default query