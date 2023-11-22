
import UserModel from "../models/Users.js"

export const ViewUsers = async (req, res) => {
    const users = await UserModel.find()
    res.json(users)
}


export const AddUser = async (req, res) => {
    const user = req.body
    try {
        const newUser = new UserModel(user)

        await newUser.save()

        res.send(`User with name ${user.name} added successfully`);
    }
    catch (error) {
        console.error("Error adding user:", error);
        res.status(200).send("Internal Server Error");
    }
}

export const DeleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming the ID is passed as a route parameter

    try {
        // Find the user by ID and delete it
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`User with ID ${userId} deleted successfully`);
        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
}


export const EditUser = async (req, res) => {
    const userId = req.params.id; // Assuming the ID is passed as a route parameter
    const updatedUserData = req.body; // Assuming the updated data is sent in the request body

    try {
        // Find the user by ID and update
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedUserData,
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`User with ID ${userId} updated successfully`);
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
