import {axiosi} from '../../config/axios'

export const addToCart=async(item)=>{
    console.log(item);
    try {
        const res=await axiosi.post('/cart',item)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchCartByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/cart/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateCartItemById = async (update) => {
    try {
        const res = await axiosi.patch(`/cart/${update._id}`, update);
        return res.data;
    } catch (error) {
        console.error("Error updating cart item by ID:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const deleteCartItemById = async (id) => {
    try {
        const res = await axiosi.delete(`/cart/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting cart item by ID:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};


export const resetCartByUserId=async(userId)=>{
    try {
        console.log("lejr")
        const res=await axiosi.delete(`/cart/user/${userId}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
