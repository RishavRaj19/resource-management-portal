export class PortalService {

    static async getResources() {
        return await fetch(`https://media-content.ccbp.in/website/react-assignment/resources.json`)
        .then(response => {
            if(response.status !== 200) {
                throw new Error(response.error() || JSON.stringify(response.json()))
            }
            return response.json()
        })
    }
}