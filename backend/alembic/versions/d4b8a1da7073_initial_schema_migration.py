"""Initial schema migration

Revision ID: d4b8a1da7073
Revises: 
Create Date: 2026-10-20 23:39:58.753186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd4b8a1da7073'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. users
    op.create_table(
        'users',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('role', sa.String(), nullable=False),
        sa.Column('jurisdiction', sa.String(), nullable=True),
        sa.Column('badge_number', sa.String(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True, default=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    op.create_index('ix_users_role', 'users', ['role'], unique=False)
    op.create_index('ix_users_jurisdiction', 'users', ['jurisdiction'], unique=False)

    # 2. emergency_contacts
    op.create_table(
        'emergency_contacts',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('relation_type', sa.String(), nullable=True),
        sa.Column('priority', sa.Integer(), nullable=True, default=1),
        sa.Column('notify_sms', sa.Boolean(), nullable=True, default=True),
        sa.Column('notify_whatsapp', sa.Boolean(), nullable=True, default=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_emergency_contacts_user_id', 'emergency_contacts', ['user_id'], unique=False)

    # 3. emergency_incidents
    op.create_table(
        'emergency_incidents',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('mode', sa.String(), nullable=False),
        sa.Column('status', sa.String(), nullable=False),
        sa.Column('initial_latitude', sa.Float(), nullable=False),
        sa.Column('initial_longitude', sa.Float(), nullable=False),
        sa.Column('current_latitude', sa.Float(), nullable=False),
        sa.Column('current_longitude', sa.Float(), nullable=False),
        sa.Column('accuracy_meters', sa.Float(), nullable=True, default=10.0),
        sa.Column('jurisdiction', sa.String(), nullable=True),
        sa.Column('assigned_police_id', sa.String(), nullable=True),
        sa.Column('responder_notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('acknowledged_at', sa.DateTime(), nullable=True),
        sa.Column('resolved_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['assigned_police_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_emergency_incidents_user_id', 'emergency_incidents', ['user_id'], unique=False)
    op.create_index('ix_emergency_incidents_status', 'emergency_incidents', ['status'], unique=False)
    op.create_index('ix_emergency_incidents_jurisdiction', 'emergency_incidents', ['jurisdiction'], unique=False)
    op.create_index('ix_emergency_incidents_assigned_police_id', 'emergency_incidents', ['assigned_police_id'], unique=False)
    op.create_index('ix_emergency_incidents_created_at', 'emergency_incidents', ['created_at'], unique=False)

    # 4. incident_location_snapshots
    op.create_table(
        'incident_location_snapshots',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('incident_id', sa.String(), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=False),
        sa.Column('longitude', sa.Float(), nullable=False),
        sa.Column('accuracy', sa.Float(), nullable=True, default=10.0),
        sa.Column('recorded_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['incident_id'], ['emergency_incidents.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_incident_location_snapshots_incident_id', 'incident_location_snapshots', ['incident_id'], unique=False)

    # 5. location_sharing_sessions
    op.create_table(
        'location_sharing_sessions',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('token', sa.String(), nullable=True),
        sa.Column('current_latitude', sa.Float(), nullable=True),
        sa.Column('current_longitude', sa.Float(), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True, default=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_location_sharing_sessions_user_id', 'location_sharing_sessions', ['user_id'], unique=False)
    op.create_index('ix_location_sharing_sessions_token', 'location_sharing_sessions', ['token'], unique=True)

    # 6. infrastructure_places
    op.create_table(
        'infrastructure_places',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('name_tamil', sa.String(), nullable=True),
        sa.Column('address', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('latitude', sa.Float(), nullable=False),
        sa.Column('longitude', sa.Float(), nullable=False),
        sa.Column('jurisdiction', sa.String(), nullable=True),
        sa.Column('is_verified', sa.Boolean(), nullable=True, default=True),
        sa.Column('verified_by_admin_id', sa.String(), nullable=True),
        sa.Column('operating_hours', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['verified_by_admin_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_infrastructure_places_category', 'infrastructure_places', ['category'], unique=False)
    op.create_index('ix_infrastructure_places_jurisdiction', 'infrastructure_places', ['jurisdiction'], unique=False)

    # 7. streetlight_segments
    op.create_table(
        'streetlight_segments',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('street_name', sa.String(), nullable=False),
        sa.Column('jurisdiction', sa.String(), nullable=True),
        sa.Column('start_latitude', sa.Float(), nullable=False),
        sa.Column('start_longitude', sa.Float(), nullable=False),
        sa.Column('end_latitude', sa.Float(), nullable=False),
        sa.Column('end_longitude', sa.Float(), nullable=False),
        sa.Column('lighting_status', sa.String(), nullable=True),
        sa.Column('total_lights', sa.Integer(), nullable=True, default=10),
        sa.Column('functional_lights', sa.Integer(), nullable=True, default=10),
        sa.Column('is_verified', sa.Boolean(), nullable=True, default=True),
        sa.Column('source', sa.String(), nullable=True),
        sa.Column('last_inspected_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_streetlight_segments_street_name', 'streetlight_segments', ['street_name'], unique=False)

    # 8. notification_logs
    op.create_table(
        'notification_logs',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('incident_id', sa.String(), nullable=True),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('recipient_name', sa.String(), nullable=False),
        sa.Column('recipient_phone', sa.String(), nullable=False),
        sa.Column('channel', sa.String(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('message_body', sa.Text(), nullable=False),
        sa.Column('provider_reference', sa.String(), nullable=True),
        sa.Column('provider_status_code', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['incident_id'], ['emergency_incidents.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_notification_logs_user_id', 'notification_logs', ['user_id'], unique=False)
    op.create_index('ix_notification_logs_incident_id', 'notification_logs', ['incident_id'], unique=False)
    op.create_index('ix_notification_logs_status', 'notification_logs', ['status'], unique=False)
    op.create_index('ix_notification_logs_created_at', 'notification_logs', ['created_at'], unique=False)

    # 9. audit_events
    op.create_table(
        'audit_events',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=True),
        sa.Column('action', sa.String(), nullable=False),
        sa.Column('resource_type', sa.String(), nullable=False),
        sa.Column('resource_id', sa.String(), nullable=True),
        sa.Column('details', sa.Text(), nullable=True),
        sa.Column('ip_address', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_audit_events_user_id', 'audit_events', ['user_id'], unique=False)
    op.create_index('ix_audit_events_action', 'audit_events', ['action'], unique=False)
    op.create_index('ix_audit_events_created_at', 'audit_events', ['created_at'], unique=False)


def downgrade() -> None:
    op.drop_table('audit_events')
    op.drop_table('notification_logs')
    op.drop_table('streetlight_segments')
    op.drop_table('infrastructure_places')
    op.drop_table('location_sharing_sessions')
    op.drop_table('incident_location_snapshots')
    op.drop_table('emergency_incidents')
    op.drop_table('emergency_contacts')
    op.drop_table('users')
