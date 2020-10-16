import express from "express";
import { saveGrade, editGrade, getAllGrades,
         getTotalGradeByStudentAndSubject, getMediaGradeBySubjectAndType,
         getBestGradesBySubjectAndType, getGradeById, deleteGradeById } from "../modules/grade.js"

const router = express.Router();

router.post("/", async (req, res, next) => {
    await saveGrade(req, res, next);
});

router.put("/", async (req, res, next) => {
    await editGrade(req, res, next);
});

router.get("/", async (req, res, next) => {
    await getAllGrades(res, next);
});

router.get("/total", async (req, res, next) => {
    await getTotalGradeByStudentAndSubject(req, res, next);
});

router.get("/media", async (req, res, next) => {
    await getMediaGradeBySubjectAndType(req, res, next);
});

router.get("/best", async (req, res, next) => {
    await getBestGradesBySubjectAndType(req, res, next);
});

router.get("/:id", async (req, res, next) => {
    await getGradeById(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
    await deleteGradeById(req, res, next);
});

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message })
})

export default router;