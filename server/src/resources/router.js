import projectRouter from './project/project.router';
import userRouter from './user/user.router';
import taskRouter from './task/task.router';
import propertyRouter from './property/property.router';
import discountRouter from './discount/discount.router';
import billingPlanRouter from './billingPlan/billingPlan.router';
import invoiceItemsRouter from './invoice_items/invoice_items.router';
import { protect } from '../utils/auth';

export const publicRouter = app => {
  app.use('/api/users', userRouter);
};

export const protectedRouter = app => {
  try {
    app.use(protect);
    app.use('/api/projects', projectRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/properties', propertyRouter);
    app.use('/api/discounts', discountRouter);
    app.use('/api/billing', billingPlanRouter);
    app.use('/api/invoice', invoiceItemsRouter);
  } catch (e) {
    console.error(e);
  }
};
