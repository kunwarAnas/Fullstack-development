import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('testing', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

// Define models
export const MigrationLog = sequelize.define('MigrationLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  migrationFileName: DataTypes.STRING,
  s3FilePath: DataTypes.STRING,
  migrationTriggeredBy: DataTypes.STRING,
  migratedRecords: DataTypes.INTEGER,
  skippedRecords: DataTypes.INTEGER,
  errorDetails: DataTypes.JSONB,
});

export const DataRecord = sequelize.define('DataRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  customer_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  source: DataTypes.STRING,
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First Name cannot be empty',
      },
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  case_reference: DataTypes.INTEGER,
  alert_trigger_date: DataTypes.STRING,
  triggered_by_rule: DataTypes.INTEGER,
  record_type: DataTypes.STRING,
  notes: DataTypes.TEXT,
  senior_analyst_user_id: DataTypes.STRING,
  investigating_analyst_user_id: DataTypes.STRING,
  case_outcome: DataTypes.STRING,
  category_of_match: DataTypes.STRING,
  attachments: DataTypes.STRING
});


export default sequelize
