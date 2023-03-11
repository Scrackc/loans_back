import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { JwtAuthGuard } from '../guards/jwt-guard.guard';

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        UseGuards(JwtAuthGuard, UserRoleGuard),
        RoleProtected(...roles),
    );
}