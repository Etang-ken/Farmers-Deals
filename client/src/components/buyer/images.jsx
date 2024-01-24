import React, { useEffect } from "react";
import { updateBreadcrumbTitleShow } from "../state_slices/breadcrumbTitleSlice";
import { useDispatch } from "react-redux";

export default function Images() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Images"));
  }, [dispatch]);
  return (
    <div className="images">
      <h1 className="heading-1">Images</h1>
    </div>
  );
}
