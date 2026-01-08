import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../auth/AuthContext";

export const useRegisterScreen = () => {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        
        setLoading(true);
        try {
            await signUp(email, password);
        } catch (e: any) {
            Alert.alert('Registration Failed', e.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleRegister,
        showPassword,
        setShowPassword,
    };
};