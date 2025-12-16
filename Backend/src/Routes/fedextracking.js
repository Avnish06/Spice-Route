import express from "express"
import FedexTrackingController from "../Controllers/TrackingController.js"

export const trackingauth = express.Router()


trackingauth.post("/trackingfedex", FedexTrackingController.trackFedexShipment)