import { useEffect, useState } from "react";
import "./style.scss"; // Import CSS file

const DTabs = () => {
  const [activeTab, setActiveTab] = useState("seo");
  const [selectorStyle, setSelectorStyle] = useState({});

  useEffect(() => {
    const handleResize = () => {
      updateSelectorStyle();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  useEffect(() => {
    updateSelectorStyle();
  }, [activeTab]);

  const updateSelectorStyle = () => {
    const activeItem: any = document.querySelector(".tabs .active");
    if (activeItem) {
      const activeWidth = activeItem.offsetWidth;
      const activeHeight = activeItem.offsetHeight;
      const itemPos = activeItem.getBoundingClientRect();

      setSelectorStyle({
        left: `${itemPos.left}px`,
        width: `${activeWidth}px`,
        height: `${activeHeight}px`,
        top: `${itemPos.top}px`,
      });
    }
  };

  const handleTabClick = (bodyName: any) => {
    setActiveTab(bodyName);
  };

  return (
    <div>
      <nav className="tabs-d">
        <div className="selector-d" style={selectorStyle}></div>
        <a
          href="#"
          data-body="seo"
          className={activeTab === "seo" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("seo");
          }}
        >
          <i className="fa fa-search" aria-hidden="true"></i>SEO
        </a>
        <a
          href="#"
          data-body="cm"
          className={activeTab === "cm" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("cm");
          }}
        >
          <i className="fa fa-file-text" aria-hidden="true"></i>Content
          Marketing
        </a>
        <a
          href="#"
          data-body="smm"
          className={activeTab === "smm" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("smm");
          }}
        >
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>Social Media
          Marketing
        </a>
        <a
          href="#"
          data-body="b"
          className={activeTab === "b" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("b");
          }}
        >
          <i className="fa fa-star" aria-hidden="true"></i>Branding
        </a>
        <a
          href="#"
          data-body="w-des"
          className={activeTab === "w-des" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("w-des");
          }}
        >
          <i className="fa fa-paint-brush" aria-hidden="true"></i>Web Design
        </a>
        <a
          href="#"
          data-body="w-dev"
          className={activeTab === "w-dev" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("w-dev");
          }}
        >
          <i className="fa fa-keyboard-o" aria-hidden="true"></i>Web Development
        </a>
      </nav>
      <div className="tab-body">
        <section className={activeTab === "seo" ? "seo" : "seo hide"}>
          SEO Content
        </section>
        <section className={activeTab === "cm" ? "cm" : "cm hide"}>
          Content Marketing
        </section>
        <section className={activeTab === "smm" ? "smm" : "smm hide"}>
          Social Media Marketing
        </section>
        <section className={activeTab === "b" ? "b" : "b hide"}>
          Branding
        </section>
        <section className={activeTab === "w-des" ? "w-des" : "w-des hide"}>
          Web Design
        </section>
        <section className={activeTab === "w-dev" ? "w-dev" : "w-dev hide"}>
          Web Development
        </section>
      </div>
    </div>
  );
};

export default DTabs;
