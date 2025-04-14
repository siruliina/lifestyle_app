import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { Checklist as ChecklistType } from "../utils/types";
import Checklist from "../components/Checklist";
import "../css/pages/Checklists.css";

const Checklists = () => {
    const axiosInstance = useAxios();
    const { auth, loading } = useAuth();
    const [checklists, setChecklists] = useState<ChecklistType[]>([]);

    const fetchChecklists = () => {
        if (loading) {
            return;
        } else {
            const params = {
                search: auth.userId,
            };

            axiosInstance
                .get(`/checklists/`, { params })
                .then((response) => {
                    console.log(response.data);
                    setChecklists(response.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                });
        }
    };
    useEffect(() => {
        fetchChecklists();
    }, [loading]);

    return (
        <div>
            <h1>Checklists</h1>
            <div className="checklists-grid">
                <Checklist fetchChecklists={fetchChecklists} />

                {checklists.length > 0
                    ? checklists.map((checklist) => (
                          <Checklist
                              key={checklist.id}
                              checklist={checklist}
                              fetchChecklists={fetchChecklists}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Checklists;
