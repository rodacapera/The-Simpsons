import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../auth/AuthContext";

export const useLoginScreen = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (e: any) {
            Alert.alert('Login Failed', e.message);
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
        handleLogin,
        showPassword,
        setShowPassword,    
    };
};