import { usePage } from "@inertiajs/react";
import SubmitAttendance from "./SubmitAttendance";
import Submitted from "./Submitted";

function Attendance() {
    const { submitted } = usePage().props;
    return submitted ? <Submitted /> : <SubmitAttendance />;
}

export default Attendance;
