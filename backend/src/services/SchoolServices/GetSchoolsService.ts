import School from "../../models/School";

const GetSchoolsService = async (): Promise<School[]> => {
    const schools = await School.findAll()

    return schools;
}

export default GetSchoolsService