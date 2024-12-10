import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t, get } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="flex-1" style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Name")}:</strong> {get(data, "name")}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Bar Code")}:</strong> {get(data, "barCode")}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Quantity")}:</strong> {get(data, "quantity")}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Price")}:</strong> {get(data, "price")}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Category")}:</strong> {get(data, "category.name")}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Customer")}:</strong> {get(data, "customer.fullName")}
      </p>
      <p style={{ marginBottom: "10px" }}><strong>{t("Photo URLs")}:</strong></p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {get(data, "photoUrl", []).map((url: string, index: number) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                alt={`Photo ${index + 1}`}
                style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </a>
          </li>
        ))}
      </ul>
      <p style={{ marginBottom: "10px" }}>
        <strong>{t("Created At")}:</strong> {new Date(get(data, "createdAt")).toLocaleString()}
      </p>
    </div>
  );
};

export default More;