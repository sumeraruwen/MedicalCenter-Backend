import { Request, RequestHandler, Response } from "express";
import { Channelling } from "../models/Channelling";
import { ChannellingDetails } from "../models/ChannellingDetails";

export default class ChannelingController{
   

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

    saveChanneling: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("hello");

            // Fetch the last channelling document
            let last = await Channelling.find({}).sort({ _id: -1 }).limit(1);
            console.log("Last channelling document:", last);

            // Compute the new appointment number
            let appoinmentNo = last.length > 0 ? last[0].appoinmentNo + 1 : 1;
            console.log("New appointment number:", appoinmentNo);

            // Create a new channelling document
            let channel = new Channelling(req.body.channelling);
            channel.appoinmentNo = appoinmentNo;

            // Save the new channelling document
            let saveChannel = await channel.save();
            console.log("Saved channelling document:", saveChannel);

            if (saveChannel) {
                // Create a new channelling details document
                let channellingDetails = new ChannellingDetails(req.body.channellingDetail);
                channellingDetails.appoinmentNo = appoinmentNo;

                // Save the new channelling details document
                let saveChannellingDetails = await channellingDetails.save();
                console.log("Saved channelling details document:", saveChannellingDetails);
            }

            return res.status(200).json({ message: "save channel", responseData: appoinmentNo });
        } catch (error: unknown) {
            console.log("Error during saveChanneling:", error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            } else {
                return res.status(500).json({ message: "unknown error" });
            }
        }
    };
    getAllChanneling:RequestHandler = async (req:Request,res:Response):Promise<Response> => {

        try {
            let channel = await Channelling.find()
            return res.status(200).json({message:" Loaded",responseData:channel})

        } catch (error:unknown) {
            if(error instanceof Error){
                return res.status(500).json({message:error})
            }else{
                return res.status(500).json({message:"unknow error"})
            }
        }    };
    updateChanneling:RequestHandler = async (req:Request,res:Response):Promise<Response> => {

        try {
            let {appoinmentNo} = req.params ;
            let updateChanneling=await Channelling.findOneAndUpdate({appoinmentNo:appoinmentNo},req.body,{
                new:true,
            });
            return res.status(200).json({message:"Successfully Updated",responseData:updateChanneling});
        } catch (error:unknown) {
            if(error instanceof Error){
                return res.status(500).json({message:error.message})
            }else{
                return res.status(500).json({message:"unknow error!"})
            }
        }       };
    deleteChanneling:RequestHandler = async (req:Request,res:Response):Promise<Response> => {

        try {
            let {appoinmentNo} = req.params ;
            let deleteChanneling=await Channelling.findOneAndDelete({appoinmentNo:appoinmentNo});
            if(!deleteChanneling){
                throw new Error("Id Not Found!") 
            }
            return res.status(200).json({message:"Successfully deleted",responseData:deleteChanneling})
        } catch (error:unknown) {
            if(error instanceof Error){
                return res.status(500).json({message:error.message})
            }else{
                return res.status(500).json({message:"unknow error!"})
            }
        }   
         };

}