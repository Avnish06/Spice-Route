import axios from "axios";


const authFedex = async () => {
    console.log("Fedex");
    try {
        const inputPayload = {
            grant_type: "client_credentials",
            client_id: process.env.FEDEX_API_KEY,
            client_secret: process.env.FEDEX_SECRET_KEY,
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.post(
            `${process.env.FEDEX_BASE_API_URL}/oauth/token`,
            inputPayload,
            { headers: headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error authenticating with FEDEX API', error)
        throw new Error('Failed to authenticate with FEDEX API')
    }
};

class FedexTrackingController {
    static trackFedexShipment = async (req, res) => {
        try {
            const authRes = await authFedex();
            const {orderid} = req.body
            //Input Data
            const inputPayload = {
                includeDetailedScans: true,
                trackingInfo: [
                    {
                        trackingNumberInfo: {
                            trackingNumber: orderid
                        }
                    }
                ]
            }
            console.log(authRes)
            res.send(authRes)
            const headers = {
                'Content-Type': 'application/json',
                'X-locale': 'en-US',
                'Authorization': `Bearer ${authRes.access_token}`
            }
            const response = await axios.post(`${process.env.FEDEX_BASE_API_URL}/track/v1/trackingnumbers`,
                inputPayload, { headers: headers })
                const trackingDetails = response.data.output.completeTrackResults[0].trackResults[0].scanEvents.map(item=>
                ({
                   eventDescription:item.eventDescription,
                   city:item.scanLocation.city
 
                }))
                
            res.send(trackingDetails)
        } catch (error) {
          console.error("Error tracking Fedex Shipment:", error);
          res.status(500).send('Failed to track Fedex Shipment')
        }
        console.log("Tracking Fedex");
    };
}

export default FedexTrackingController;
