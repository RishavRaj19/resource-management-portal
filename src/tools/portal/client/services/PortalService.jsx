import { toast } from "react-toastify"

export class PortalService {

    static async getResources() {
        return await fetch(`https://media-content.ccbp.in/website/react-assignment/resources.json`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.error() || JSON.stringify(response.json()))
                }
                return response.json()
            })
    }

    static async createResource(resource) {

        // string and link validation
        if (this.validateStringInput(resource.itemName, 1, 25, "Item-Name")
            && this.validateLink(resource.link)
            && this.validateStringInput(resource.name, 1, 15, "Resource-Name")
            && this.validateStringInput(resource.description, 1, 100, "Description")) {


            await fetch(`https://media-content.ccbp.in/website/react-assignment/add_resource.json`)
                .then(response => {
                    response.status === 200 ? this.successToast() : this.errorToast('api call failed to fetch with status code ' + response.status)
                })
        }

    }

    static validateLink(link) {
        // empty validation
        if (link.length < 1) {
            this.errorToast('empty link is not allowed')
            return false
        }

        //reg exp validation
        const expression =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const regex = new RegExp(expression)
        if (!link.match(regex)) {
            this.errorToast('Invalid Link! Refer, the RegExp = ' + expression + ' to construct a valid link.')
            return false
        }
        return true
    }

    static validateStringInput(input, minNumChars, maxNumChars, stringName) {
        // empty and maxChar validation
        if (input.length < minNumChars || input.length > maxNumChars) {
            this.errorToast('Length of ' + stringName + ' should be in the range [' + minNumChars + ', ' + maxNumChars + ']')
            return false
        }

        //reg exp validation
        const expression = /^(?=[a-zA-Z])([a-zA-Z0-9]*[ -]*)*[a-zA-Z0-9]*$/
        const regExp = new RegExp(expression)
        if (!input.match(regExp)) {
            this.errorToast('Invalid ' + stringName + '! Refer, the RegExp = ' + expression + ' to construct a valid ' + stringName + '.')
            return false
        }
        return true
    }

    static errorToast = (message) => {
        return toast.error(message, {
            position: "bottom-center",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    static successToast = () => {
        return toast.success('Validated! Resource creation successful!', {
            position: "bottom-center",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

}