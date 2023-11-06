import apiService from '../../ApiCaller/ApiCaller'; 


export const getUser = async () => {
    try {
      const response = await apiService.getUserInformation();
      return response; 
    } catch (err) {
        const error: Error = err as Error;
        console.error("Error:", error);
        throw error; 
    }
  };


