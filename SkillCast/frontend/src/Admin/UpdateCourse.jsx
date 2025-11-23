import { AdminHeader } from "./AdminSignin";

const style = { background: "black", width: "100%" };

export function UpdateCourse() {
  return (
    <>
      <div style={style}>
        <AdminHeader />
        <div className="create-course">
          <input type="text" placeholder="Title..." />
          <input type="text" placeholder="Description..." />
          <input type="number" placeholder="Price..." />
          <input type="text" placeholder="Image... " />
          <button id="add-course">Update</button>
        </div>
      </div>
    </>
  );
}
