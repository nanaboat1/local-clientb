import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from '../state'; 
import { useMemo } from "react";



// bind all action componens
export const useActions = () => { 

    const dispatch = useDispatch(); 

    

    return useMemo(() => { 
        return bindActionCreators(actionCreators, dispatch); 
    }, [dispatch]);
};

