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

function Cards() {
  const cards = [
    {
      title: "Operasional",
      link: "operasional/dashboard",
      icon: "mdi:cog-outline",
    },
    {
      title: "Setting",
      link: "setting/dashboard",
      icon: "mdi:database",
    },
    {
      title: "Marketing",
      link: "marketing/dashboard",
      icon: "mdi:bullhorn",
    },
  ];

  return (
    <CRow className="justify-content-center">
      {cards.map((card) => (
        <CCol key={card.title} md="4" style={{ padding: "1rem" }}>
          <CCard
            className="transition duration-300 ease-in-out transform hover:scale-105"
            style={{ height: "100%" }}
          >
            <div className="relative flex justify-center items-center h-48 bg-gray-100 glassmorphism">
              <Icon icon={card.icon} width="64" height="64" />
            </div>
            <CCardBody>
              <CCardTitle className="font-semibold">{card.title}</CCardTitle>
              <CCardText className="text-gray-500">
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </CCardText>
              <div className="pt-2">
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
      ))}
    </CRow>
  );
}

export default Cards;
