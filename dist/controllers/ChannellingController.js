"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channelling_1 = require("../models/Channelling");
const ChannellingDetails_1 = require("../models/ChannellingDetails");
class ChannelingController {
    constructor() {
        // saveChanneling:RequestHandler = async (req:Request,res:Response):Promise<Response> => {
        //    // console.log("hello");
        //     try {
        //         console.log("hello");
        //         let last = await Channelling.find({}).sort({ _id: -1 }).limit(1);
        //         let appoinmentNo = last[0].appoinmentNo + 1;
        //         let channel = new Channelling(req.body.channelling);      
        //         channel.appoinmentNo = appoinmentNo;
        //         let saveChannel = await channel.save();
        //         console.log(saveChannel)
        //         if (saveChannel) {
        //             let channellingDetails = new ChannellingDetails(req.body.channellingDetail);
        //             channellingDetails.appoinmentNo = appoinmentNo;
        //             let saveChannellingDetails = await channellingDetails.save();   
        //             console.log("saveChannellingDetails")
        //         }
        //         return res.status(200).json({message:"save channel",responseData:appoinmentNo});
        //     } catch (error:unknown) {
        //            console.log("discard")
        //         if(error instanceof Error){
        //             return res.status(500).json({message:error});
        //         }else{
        //             return res.status(500).json({message:"unknow error"});
        //         }
        //     }   
        //   };
        this.saveChanneling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello");
                // Fetch the last channelling document
                let last = yield Channelling_1.Channelling.find({}).sort({ _id: -1 }).limit(1);
                console.log("Last channelling document:", last);
                // Compute the new appointment number
                let appoinmentNo = last.length > 0 ? last[0].appoinmentNo + 1 : 1;
                console.log("New appointment number:", appoinmentNo);
                // Create a new channelling document
                let channel = new Channelling_1.Channelling(req.body.channelling);
                channel.appoinmentNo = appoinmentNo;
                // Save the new channelling document
                let saveChannel = yield channel.save();
                console.log("Saved channelling document:", saveChannel);
                if (saveChannel) {
                    // Create a new channelling details document
                    let channellingDetails = new ChannellingDetails_1.ChannellingDetails(req.body.channellingDetail);
                    channellingDetails.appoinmentNo = appoinmentNo;
                    // Save the new channelling details document
                    let saveChannellingDetails = yield channellingDetails.save();
                    console.log("Saved channelling details document:", saveChannellingDetails);
                }
                return res.status(200).json({ message: "save channel", responseData: appoinmentNo });
            }
            catch (error) {
                console.log("Error during saveChanneling:", error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                else {
                    return res.status(500).json({ message: "unknown error" });
                }
            }
        });
        this.getAllChanneling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let channel = yield Channelling_1.Channelling.find();
                return res.status(200).json({ message: " Loaded", responseData: channel });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ message: error });
                }
                else {
                    return res.status(500).json({ message: "unknow error" });
                }
            }
        });
        this.updateChanneling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { appoinmentNo } = req.params;
                let updateChanneling = yield Channelling_1.Channelling.findOneAndUpdate({ appoinmentNo: appoinmentNo }, req.body, {
                    new: true,
                });
                return res.status(200).json({ message: "Successfully Updated", responseData: updateChanneling });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                else {
                    return res.status(500).json({ message: "unknow error!" });
                }
            }
        });
        this.deleteChanneling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { appoinmentNo } = req.params;
                let deleteChanneling = yield Channelling_1.Channelling.findOneAndDelete({ appoinmentNo: appoinmentNo });
                if (!deleteChanneling) {
                    throw new Error("Id Not Found!");
                }
                return res.status(200).json({ message: "Successfully deleted", responseData: deleteChanneling });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                else {
                    return res.status(500).json({ message: "unknow error!" });
                }
            }
        });
    }
}
exports.default = ChannelingController;
