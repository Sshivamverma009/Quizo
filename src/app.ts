import express, {Application} from "express"
import cors from 'cors'
import quizRouter from './routes/quiz.routes';
import userRouter from './routes/user.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/quiz',quizRouter);
app.use('/api/user', userRouter);

export default app;