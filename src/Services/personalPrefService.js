import axios from "axios";

class PersonalPrefernceAnalysisService {

    createPersonalPrefernceProfile = async (body) => {
        try {
            let result = await axios.post("http://localhost:7000/api/profile", body);
            return result.data.result;
        } catch (err) {
            throw err;
        }

    }

    updatePrefernceProfile =  async (body,id) => {
        try {
            let result = await axios.put("http://localhost:7000/api/profile/"+id, body);
            return result.data.result;
        } catch (err) {
            throw err;
        }
    }

    deletePrefernceProfile = async (id) => {
        try {
            let result = await axios.delete("http://localhost:7000/api/profile/"+id);
            return result.data.result;
        } catch (err) {
            throw err;
        }
    }

    getPrefernceScore = async (body) => {
        try {
            let result = await axios.post("http://localhost:7000/api/search", body);
            return result.data.result;
        } catch (err) {
            throw err;
        }
    }


}

export default new PersonalPrefernceAnalysisService();