import { css } from "emotion";
import { styled } from "react-emotion";
import PublishSubscribe from "publish-subscribe-js";
import React from "react";




// Prepare table body HTML
export const prepareToolTipMarkup = (data) => {
    let row = `
        <div class="info-wrapper">
        <ul>
    `;
    Object.keys(data).map((key) => {
        row += `
            <li>
                <span class="info-labels">${key}</span>
                <span>${data[key]}</span>
            </li>
        `;
    });
    row += `</ul></div>`;
    return row;
};

class Tooltip extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isToolTipVisible: false
        };
        this.triggerIconRef = props.referenceElement.querySelectorAll(props.triggerIcon);
        this.bindEventsToTriggerIcon = this.bindEventsToTriggerIcon.bind(this);
        this.bindEventsToTriggerIcon();
        
    }
    componentDidMount() {
        PublishSubscribe.subscribe('DocumentClicked', (event) => {
            console.log("Clicked on ", event.target);
        });
    }
    bindEventsToTriggerIcon() {
        this.triggerIconRef.addEventListener("mouseenter", (event) => {
            this.showTooltip();
        });
        this.triggerIconRef.addEventListener("mouseleave", (event) => {
            this.hideTooltip();
        });
        this.triggerIconRef.addEventListener("click", (event) => {
            this.showTooltip();
        });
    }
    hideTooltip() {
        this.setState({
            isToolTipVisible: false
        });
    }
    handleClickOnIcon() {
        let wrapperClassName = ".document-info-wrapper",
          targetElement = $(event.currentTarget),
          parentRow = targetElement.parents("tr"),
          parent = targetElement.parent(),
          docId = parseInt(parent.attr("data-docId"));
  
      if (!isPopupNodeAlreadyInDOM(parent, wrapperClassName)) {
          let infoWrapperContent = prepareInfoPopupHTML(docsMetaData.filter((doc) => doc.id === docId)[0]);
          parent.append(infoWrapperContent);
      } else {
        parent.show();
      }
      parent.find(wrapperClassName).addClass("infoSelectedOnClick");
    }
    handleHoverOnIcon() {
        let wrapperClassName = ".document-info-wrapper",
        target = $(event.currentTarget),
        docId = parseInt(target.attr("data-docId"));
    
        if (event.type === "mouseenter") {
            if (!isPopupNodeAlreadyInDOM(target, wrapperClassName)) {
                let infoWrapperContent = prepareInfoPopupHTML(docsMetaData.filter((doc) => doc.id === docId)[0]);
    target.append(infoWrapperContent);
            } else {
                target.children(wrapperClassName).show();
            }
        } else if (event.type === "mouseleave") {
            checkAndHideOpenPop(target, wrapperClassName);
        }
    }
}