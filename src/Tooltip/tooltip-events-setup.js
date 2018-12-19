import PublishSubscribe from "publish-subscribe-js";

window.onload = () => {
    document.addEventListener("click", (event) => {
        PublishSubscribe.publish('DocumentClicked', event);
    });
};