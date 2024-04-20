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
import { Icon } from "@iconify/react";

function Cards({ card }) {
  return (
    <CRow className="justify-content-center">
      <CCol key={card.title} md="4" className="my-3">
        <CCard className="h-100">
          <div className="p-3 bg-gray-100 text-center">
            <Icon icon={card.icon} width="64" height="64" />
          </div>
          <CCardBody>
            <CCardTitle className="text-center font-semibold">
              {card.title}
            </CCardTitle>
            <CCardText className="text-center text-gray-500">
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </CCardText>
            <div className="pt-2 d-flex justify-content-center">
              <CButton
                className="bg-teal-500 hover:bg-teal-800 text-white"
                href={card.link}
              >
                View Details
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Cards;
