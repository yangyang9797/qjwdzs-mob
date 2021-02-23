export const UrlUtil = {
    //  UrlUtil.plus("http://kjxx.cnovit.com/hjjc/hjjc/index.html#hjjc/sjgl","../web/iamge/upload")
    plus(uris) {
        console.info("UrlUtil:plus:uris", uris);
        let url;
        uris.forEach(uri => {
            if (!url) {
                url = uri;
            } else {
                if (uri.startsWith("http://")) {
                    // 路径从根目录开始
                    url = uri;
                } else if (uri.startsWith("https://")) {
                    // 路径从根目录开始
                    url = uri;
                } else if (uri.startsWith("/")) {
                    // 路径从根目录开始
                    url = this.get(this.getRoot(url) + uri);
                } else if (uri.startsWith("./")) {
                    // 相对路径
                    url = this.get(url + "/" + uri.substring(2));
                } else if (uri.startsWith("../")) {
                    while (uri.startsWith("../")) {
                        uri = uri.substring(3);
                        url = this.getParent(url);
                    }
                    url = this.get(url + "/" + uri);
                } else {
                    url = this.get(url + "/" + uri);
                }
            }
        });
        console.info("UrlUtil:plus:url", url);
        // debugger
        return url;
    },
    getRoot(url) {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url.substring(0, (url + "/").indexOf("/", 8));
        }
        return url;
    },
    get(url) {
        while (url.indexOf("//") > -1) {
            url = url.replace(/\/\//g, '/');
        }
        url = url.replace(':/', '://');
        return url
    },
    getParent(url) {

        console.info("UrlUtil:getParent:input:url", url);
        // debugger
        url = this.getDir(url);
        url = url.substring(0, url.lastIndexOf("/"))

        console.info("UrlUtil:getParent:output:url", url);
        return url;
    },
    // 获取地址的目录
    getDir(url) {
        url = this.get(url + "/");
        const root = this.getRoot(url);
        url = url.substring(root.length);
        let i = url.indexOf(".");
        if (i < 0) {
            i = url.indexOf("?")
        }
        if (i < 0) {
            i = url.indexOf("#")
        }
        if (i > -1) {
            url = url.substring(0, i);
        }
        url = url.substring(0, url.lastIndexOf("/"))
        return root + url;
    }
}

export default UrlUtil
