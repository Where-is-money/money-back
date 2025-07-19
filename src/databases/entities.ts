import { EventBox } from '@libs/ddd/event-box';
import { Role } from '../services/roles/domain/roles.entity';
import { User } from '../services/users/domain/users.entity';

export default [User, EventBox, Role];
