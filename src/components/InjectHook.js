import React, { Component } from "react";

const InjectHook = (Component, hook) => props => {
    return <Component {...props} hook={{[hook.name]: hook.call()}} />;
};

export default InjectHook;
