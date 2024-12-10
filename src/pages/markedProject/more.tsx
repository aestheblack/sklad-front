import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">
              {t("Field")}
            </th>
            <th className="border border-gray-300 p-2 text-left">
              {t("Value")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">{t("Student")}:</td>
            <td className="border border-gray-300 p-2">
              {t("Username")}: <b>{data.student.username}</b><br/>
              {t("Full name")}: <b>{data.student.firstName}</b>{" "}
              <b>{data.student.lastName}</b><br/>
              {t("Phone number")}: <a href={`tel:${data.student.phoneNumber}`}><b>{data.student.phoneNumber}</b></a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Project")}:</td>
            <td className="border border-gray-300 p-2">
              <a href={data.projectUrl} target="_blank" rel="noopener noreferrer">
                <b>{data.projectUrl}</b>
              </a><br/>
              {t("Is Correct")}: <b style={{ color: data.isCorrect ? "green" : "red" }}>
                {data.isCorrect ? t("True") : t("False")}
              </b>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Title")}:</td>
            <td className="border border-gray-300 p-2">
              <b>{data.title}</b>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Description")}:</td>
            <td className="border border-gray-300 p-2">
              <b>{data.description}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default More;