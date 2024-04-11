import {
  CCard,
  CCardText,
  CCardBody,
  CCardTitle,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

function Cards() {
  const cardTitles = ["Operasional", "Master", "Marketing"];

  return (
    <CRow className="justify-content-center">
      {cardTitles.map((title, index) => (
        <CCol key={title} md="4" style={{ padding: "1rem" }}>
          <CCard style={{ width: "100%", height: "100%" }}>
            <CCardBody style={{ padding: "1rem" }}>
              <CCardTitle>{title}</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
              {title === "Operasional" ? (
                <CButton color="primary" href="operasional/dashboard">
                  Details
                </CButton>
              ) : (
                <CButton color="primary" href="#">
                  Details
                </CButton>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
}

export default Cards;
