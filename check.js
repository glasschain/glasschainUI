const url = "google.com"

// check whether the url is live or not
const check = async () => {
    try {
        const response = await fetch(url)
        if (response.status === 200) {
        console.log("Live")
        } else {
        console.log("Not Live")
        }
    } catch (error) {
        console.log("Not Live")
    }
    }
check()