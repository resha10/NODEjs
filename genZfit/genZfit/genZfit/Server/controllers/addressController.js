import Address from "../models/Address.js"


//  add address
export const addAddress = async(req ,res) =>{
    try {
        const {address , userId} = req.body
        
        // Normalize address fields to match schema (handle both camelCase and lowercase)
        const normalizedAddress = {
            firstName: address.firstName || address.firstname || '',
            lastName: address.lastName || address.lastname || '',
            email: address.email || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
            country: address.country || address.contry || '',
            phone: address.phone || '',
            userId: userId
        }

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
        const missingFields = requiredFields.filter(field => !normalizedAddress[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        await Address.create(normalizedAddress);
        res.json({success: true , message:"Address added successfully"})
    } catch (error) {
        console.error('Add Address Error:', error);
        res.status(500).json({success:false , message:error.message});
    }
    
}

//  get address

export const getAddress = async(req,res) =>{

    try {
        // Get userId from authenticated user (set by authUser middleware)
        const userId = req.body.userId;
        
        if (!userId) {
            return res.status(400).json({success: false, message: "User ID is required"});
        }

        const addresses = await Address.find({userId});
        res.json({success:true , address: addresses})
        
    } catch (error) {
        console.error('Get Address Error:', error.message);
        res.status(500).json({success :false , message : error.message})
        
    }

}
