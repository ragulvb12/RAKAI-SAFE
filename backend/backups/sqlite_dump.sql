BEGIN TRANSACTION;
CREATE TABLE audit_events (
	id VARCHAR NOT NULL, 
	user_id VARCHAR, 
	action VARCHAR NOT NULL, 
	resource_type VARCHAR NOT NULL, 
	resource_id VARCHAR, 
	details TEXT, 
	ip_address VARCHAR, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE SET NULL
);
INSERT INTO "audit_events" VALUES('49460099-7f59-41a4-8cf0-bec3cb2fe0cf','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:27:03.902378');
INSERT INTO "audit_events" VALUES('bf3971da-abcb-44c4-8696-9e9b1187c0ca','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 09:27:04.281174');
INSERT INTO "audit_events" VALUES('e6562ae9-80e5-4602-abb4-9c2b6ec9d746','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','testclient','2026-10-20 09:27:04.659279');
INSERT INTO "audit_events" VALUES('ab668456-4323-4498-a188-2d4d7ebcd869','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:27:05.089697');
INSERT INTO "audit_events" VALUES('7eb2c011-0b38-4a25-88d1-4949851ea3a6','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:27:05.573297');
INSERT INTO "audit_events" VALUES('c6021ab2-e3d5-40a8-af77-41c0145de993','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','4c2f5431-88bd-4fc2-a519-fd55927822b4','Distress mode: SIREN at 13.08270, 80.27070','testclient','2026-10-20 09:27:05.634538');
INSERT INTO "audit_events" VALUES('590dd9f4-a739-4100-be85-711129e945fa','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 09:27:06.175221');
INSERT INTO "audit_events" VALUES('0ed642ed-e9a4-4995-8242-1ab39911e743','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','4c2f5431-88bd-4fc2-a519-fd55927822b4','Status changed from ACTIVE to ACKNOWLEDGED. Notes: Unit 4 dispatched to Park Town square.','testclient','2026-10-20 09:27:06.241079');
INSERT INTO "audit_events" VALUES('88c20dfd-9ac4-442e-b5ef-3b2eb0749396','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','4c2f5431-88bd-4fc2-a519-fd55927822b4','Resolved with status RESOLVED. Notes: User terminated distress session.','testclient','2026-10-20 09:27:06.276989');
INSERT INTO "audit_events" VALUES('0cfebc13-cd3a-4f17-ae14-8475ba10654e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:30:02.194459');
INSERT INTO "audit_events" VALUES('ec734deb-b96c-4463-ad26-bc1b416ad2ab','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 09:30:02.572147');
INSERT INTO "audit_events" VALUES('27ddc490-523a-411a-b72c-265adc2fe44c','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','testclient','2026-10-20 09:30:02.993913');
INSERT INTO "audit_events" VALUES('e23b3e5f-3b3a-4d0d-ade2-9e7add15a69a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:30:03.528800');
INSERT INTO "audit_events" VALUES('2c803ce9-967a-4907-9869-5fa2239fe830','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 09:30:04.007149');
INSERT INTO "audit_events" VALUES('a6a00742-fbf9-4f5a-bdbe-ab986592bb0e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','2321d5ae-434a-4236-b9f1-a369caf2292d','Distress mode: SIREN at 13.08270, 80.27070','testclient','2026-10-20 09:30:04.076504');
INSERT INTO "audit_events" VALUES('e6488058-75b9-4796-a67a-984faa55583e','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 09:30:04.559632');
INSERT INTO "audit_events" VALUES('e89bf336-53f2-4149-81a7-25fc28f65ec8','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','2321d5ae-434a-4236-b9f1-a369caf2292d','Status changed from ACTIVE to ACKNOWLEDGED. Notes: Unit 4 dispatched to Park Town square.','testclient','2026-10-20 09:30:04.609852');
INSERT INTO "audit_events" VALUES('ae83c9d2-49ad-4f42-887a-54737269688a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','2321d5ae-434a-4236-b9f1-a369caf2292d','Resolved with status RESOLVED. Notes: User terminated distress session.','testclient','2026-10-20 09:30:04.643062');
INSERT INTO "audit_events" VALUES('a6f0e7bc-9647-41a7-881f-6d79a26dae26','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 09:47:11.730476');
INSERT INTO "audit_events" VALUES('86fab2e5-fece-4416-a00b-b4e013a27cb9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','d300eb0d-3e78-42cd-880b-493ed819a448','Distress mode: SIREN at 13.08270, 80.27070','127.0.0.1','2026-10-20 09:47:53.380202');
INSERT INTO "audit_events" VALUES('7a66deda-670e-455a-b54a-f394f127f5c7','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','d5946df6-a5aa-400e-a683-a7f96678bda3','Distress mode: SIREN at 13.08270, 80.27070','127.0.0.1','2026-10-20 09:47:53.436813');
INSERT INTO "audit_events" VALUES('c304d040-77e7-423c-8624-63648b0ce26d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','d300eb0d-3e78-42cd-880b-493ed819a448','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 09:48:09.775085');
INSERT INTO "audit_events" VALUES('8e0b2178-91df-40b1-8d7e-ccbf8a6dade7','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','d5946df6-a5aa-400e-a683-a7f96678bda3','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 09:49:25.883207');
INSERT INTO "audit_events" VALUES('2b21d072-88cc-4b13-9691-60febf7aeaa0','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 09:51:45.024134');
INSERT INTO "audit_events" VALUES('bff62fd1-ad38-46da-897a-b5df47075873','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 09:51:45.100643');
INSERT INTO "audit_events" VALUES('285fc5a2-95df-4a0e-aab0-29023e696b0e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 09:51:47.021254');
INSERT INTO "audit_events" VALUES('e761a0a2-f7b0-4367-951c-3b38e525ea77','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 09:55:07.758157');
INSERT INTO "audit_events" VALUES('923ac062-217f-4e07-905c-ef6cf9238654','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','127.0.0.1','2026-10-20 09:57:05.731470');
INSERT INTO "audit_events" VALUES('078ab69f-04ba-4f56-bbe7-f54a47f58939','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 10:09:50.711592');
INSERT INTO "audit_events" VALUES('14eaa531-1794-4233-b6f8-f840ae465a06','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','2947a354-2bae-43a9-a04f-9d0f398e632f','Distress mode: SIREN at 13.08270, 80.27070','127.0.0.1','2026-10-20 10:10:36.562385');
INSERT INTO "audit_events" VALUES('814982ba-7cf7-4a3c-aa6d-e5f9183f2d7a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ced8d6d4-6e33-4666-89e5-11e1f7af790c','Distress mode: SIREN at 13.08270, 80.27070','127.0.0.1','2026-10-20 10:10:36.595379');
INSERT INTO "audit_events" VALUES('4d1838af-3701-40c6-84a4-06d1cd2b9f45','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','ced8d6d4-6e33-4666-89e5-11e1f7af790c','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 10:11:43.303674');
INSERT INTO "audit_events" VALUES('fd96426e-894b-4511-8765-caa007d4810a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 10:17:57.260467');
INSERT INTO "audit_events" VALUES('21b248f0-be29-46ef-8f9d-d3d37f3bcf39','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','2947a354-2bae-43a9-a04f-9d0f398e632f','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 10:18:31.535137');
INSERT INTO "audit_events" VALUES('b3e7eab0-3251-40ab-8979-6c57817ea8e7','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Distress mode: SILENT at 10.95440, 76.99380','127.0.0.1','2026-10-20 10:18:35.935395');
INSERT INTO "audit_events" VALUES('0a872b61-a7cb-47ac-ad77-112c6185aa4d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 10:18:41.579792');
INSERT INTO "audit_events" VALUES('dd990f01-192f-4ca0-9b39-551e63a976a6','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 10:18:41.583547');
INSERT INTO "audit_events" VALUES('f13977e4-a160-4096-984c-8c4a96365f79','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 10:18:44.114619');
INSERT INTO "audit_events" VALUES('a77329ad-0114-4da7-8fd4-4e16a61ff36c','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 10:21:45.023263');
INSERT INTO "audit_events" VALUES('10166dbe-7c84-4e52-863d-ab7a7f63afd9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 10:29:56.219929');
INSERT INTO "audit_events" VALUES('b902dbf8-dc3e-4257-97a4-ce5125cfda82','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','beb909d3-f1e9-481e-8bc2-1cf972eca804','Distress mode: SILENT at 10.95440, 76.99380','127.0.0.1','2026-10-20 10:32:41.013231');
INSERT INTO "audit_events" VALUES('8581d9a1-5bb4-425b-9fdb-39fa1675b89d','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 10:33:00.879855');
INSERT INTO "audit_events" VALUES('d7f4f025-b136-426f-8d49-5f2991921fcb','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Status changed from RESOLVED to ON_SCENE. Notes: None','127.0.0.1','2026-10-20 10:33:16.359593');
INSERT INTO "audit_events" VALUES('c440748c-a5f7-4b62-a104-95379a7d2c2a','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Status changed from ON_SCENE to ACKNOWLEDGED. Notes: None','127.0.0.1','2026-10-20 10:33:17.384187');
INSERT INTO "audit_events" VALUES('8d925b93-1a7a-4b04-8fc3-d097a0659489','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Status changed from ACKNOWLEDGED to DISPATCHED. Notes: None','127.0.0.1','2026-10-20 10:33:18.159376');
INSERT INTO "audit_events" VALUES('e5fe61a2-fff1-4b64-a0ca-3e1e4f71c2fb','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','127.0.0.1','2026-10-20 10:33:41.248645');
INSERT INTO "audit_events" VALUES('9ed5ff98-e26b-41de-bf27-613c24956882','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 10:34:14.465144');
INSERT INTO "audit_events" VALUES('01296711-a1f1-4581-be17-45d27ab1099e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 10:40:40.138569');
INSERT INTO "audit_events" VALUES('f44aa3b9-c8de-40f3-a5ba-a293fd917df2','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','127.0.0.1','2026-10-20 10:41:38.813122');
INSERT INTO "audit_events" VALUES('0f57575e-a4fb-4789-b0d3-2eca29496abf','52d03d73-9539-451c-989a-9729c55a52d8','SOS_TRIGGERED','INCIDENT','239589d0-f516-4c18-8dda-f7af4d8d4a78','Distress mode: SIREN at 13.08270, 80.27070','127.0.0.1','2026-10-20 10:42:48.248343');
INSERT INTO "audit_events" VALUES('c2175b88-e36d-4a96-a13e-5c567da0b2da','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 10:44:59.523077');
INSERT INTO "audit_events" VALUES('d475696f-c148-4b31-9801-39e05023bc53','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 11:19:09.378824');
INSERT INTO "audit_events" VALUES('31fdd541-f0de-4506-8ab4-0a478a8e52ff','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','95cb5a78-e338-476b-a03e-548431c8ab5d','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 11:19:11.622871');
INSERT INTO "audit_events" VALUES('beedef03-d58c-46a4-a557-d7ae78e7af4a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','beb909d3-f1e9-481e-8bc2-1cf972eca804','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 11:25:57.611072');
INSERT INTO "audit_events" VALUES('565f1165-9598-404e-9090-d001caacecbc','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 11:26:21.602849');
INSERT INTO "audit_events" VALUES('818ca5e6-0f46-44ef-b9c9-4697ebfead84','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 11:26:31.546548');
INSERT INTO "audit_events" VALUES('420b984d-0f64-491b-849f-a624ea1de7f3','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 11:26:31.602604');
INSERT INTO "audit_events" VALUES('6598235b-affd-4ff0-b8fa-cf08d21e886a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 11:37:24.999568');
INSERT INTO "audit_events" VALUES('8db7ee0d-f639-4ff7-a1c0-6aecb308d3d3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 12:11:24.029355');
INSERT INTO "audit_events" VALUES('e2f7d2bf-289b-47cd-81d5-74904e59fefc','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','1f7f6f52-ff5a-427b-81a7-be9235f348b9','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 12:11:31.432736');
INSERT INTO "audit_events" VALUES('f3e04fee-814b-4deb-9f93-6aa15dac4ce3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ea87181c-9e6a-494f-bfd0-bc81f6437ef9','Distress mode: SIREN at 10.95440, 76.99380','127.0.0.1','2026-10-20 12:11:31.470373');
INSERT INTO "audit_events" VALUES('b33f9bb2-3bc6-4c2c-9ac0-8e8f2c01598f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','ea87181c-9e6a-494f-bfd0-bc81f6437ef9','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:11:39.674949');
INSERT INTO "audit_events" VALUES('f9166a76-8b91-4c10-b1df-5ad575594585','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:17:24.790696');
INSERT INTO "audit_events" VALUES('bcdcccde-abe5-4b7a-97b3-f3913c7e92ea','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:17:25.168160');
INSERT INTO "audit_events" VALUES('299e7547-1f38-43e8-9c11-ab3a9dbaab4c','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','testclient','2026-10-20 12:17:25.537065');
INSERT INTO "audit_events" VALUES('3db1a546-59df-436a-9dab-6f176c8042d3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:17:25.917141');
INSERT INTO "audit_events" VALUES('c5b2b637-714f-4ff7-9a99-71566254be24','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:17:26.350832');
INSERT INTO "audit_events" VALUES('cea32b0c-8870-46cc-bce5-f0642051d69f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','1f7f6f52-ff5a-427b-81a7-be9235f348b9','Distress mode: SIREN at 13.08270, 80.27070 (SMS Dispatched: True)','testclient','2026-10-20 12:17:26.402926');
INSERT INTO "audit_events" VALUES('96346d09-6ab1-4cb3-93c5-79e31c99d229','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:17:26.805283');
INSERT INTO "audit_events" VALUES('e428c7e8-5f0a-4699-9711-714561a31113','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','1f7f6f52-ff5a-427b-81a7-be9235f348b9','Status changed from ACTIVE to ACKNOWLEDGED. Notes: Unit 4 dispatched to Park Town square.','testclient','2026-10-20 12:17:26.865461');
INSERT INTO "audit_events" VALUES('0bfa2dab-7802-492f-9e9c-1cae13444010','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','1f7f6f52-ff5a-427b-81a7-be9235f348b9','Resolved with status RESOLVED. Notes: User terminated distress session.','testclient','2026-10-20 12:17:26.894565');
INSERT INTO "audit_events" VALUES('00ac137c-2955-4214-83e7-b19962bd1193','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:18:01.930976');
INSERT INTO "audit_events" VALUES('8b06428a-6898-47e3-a8de-d98b7945fb6d','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:18:02.327901');
INSERT INTO "audit_events" VALUES('7d0dfc26-f2f4-4f69-b8c2-4aa78c7f5614','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','testclient','2026-10-20 12:18:02.718639');
INSERT INTO "audit_events" VALUES('5b869945-571e-4edc-a84a-5d4b748cef26','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:18:03.104423');
INSERT INTO "audit_events" VALUES('231151ec-b996-459f-ad58-6af5c61b0908','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:18:03.515891');
INSERT INTO "audit_events" VALUES('c716e31a-703d-45c8-83b8-373b5dd39d3f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','3120059c-42c6-41b6-a266-744f0890135b','Distress mode: SIREN at 13.08270, 80.27070 (SMS Dispatched: True)','testclient','2026-10-20 12:18:03.589293');
INSERT INTO "audit_events" VALUES('c159c85c-4f67-4a1f-be67-caecfff6d0e0','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:18:03.994212');
INSERT INTO "audit_events" VALUES('ea713d6d-ffcd-41e9-b857-5721a26ee246','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','3120059c-42c6-41b6-a266-744f0890135b','Status changed from ACTIVE to ACKNOWLEDGED. Notes: Unit 4 dispatched to Park Town square.','testclient','2026-10-20 12:18:04.035648');
INSERT INTO "audit_events" VALUES('ca3cf701-e032-4dc8-a355-5f09df7a3114','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','3120059c-42c6-41b6-a266-744f0890135b','Resolved with status RESOLVED. Notes: User terminated distress session.','testclient','2026-10-20 12:18:04.060027');
INSERT INTO "audit_events" VALUES('872fdfae-62f1-45ae-b42a-5bb7fc7bba9d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:22:31.376169');
INSERT INTO "audit_events" VALUES('9c1d728a-201d-4583-af23-995a35f20d54','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:22:31.788253');
INSERT INTO "audit_events" VALUES('a72d4723-bbd3-47bd-a573-eaff45247374','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','testclient','2026-10-20 12:22:32.229592');
INSERT INTO "audit_events" VALUES('99a8c222-0000-442c-8a51-d36efff91c6d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:22:32.655605');
INSERT INTO "audit_events" VALUES('cf51ecaa-2feb-4f86-b168-3952a89eebba','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','testclient','2026-10-20 12:22:33.129303');
INSERT INTO "audit_events" VALUES('9e460d2c-439b-4718-8e06-c8ed20c329a5','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','Distress mode: SIREN at 13.08270, 80.27070 (SMS Dispatched: True)','testclient','2026-10-20 12:22:33.204621');
INSERT INTO "audit_events" VALUES('a6177215-f5fa-4579-8298-00535ba6e4bf','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','testclient','2026-10-20 12:22:33.597687');
INSERT INTO "audit_events" VALUES('aaa653a7-c82c-46af-bad8-986bce14decc','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','Status changed from ACTIVE to ACKNOWLEDGED. Notes: Unit 4 dispatched to Park Town square.','testclient','2026-10-20 12:22:33.648909');
INSERT INTO "audit_events" VALUES('b71ef98d-3c93-445a-ad1c-6abe1e7f0bc8','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','Resolved with status RESOLVED. Notes: User terminated distress session.','testclient','2026-10-20 12:22:33.675417');
INSERT INTO "audit_events" VALUES('5d7dbce4-02ce-48e2-9fd9-f73132a1bced','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','8e570637-5401-43ba-8ecd-6e8712275aad','Distress mode: SIREN at 13.08270, 80.27070 (SMS Dispatched: True)',NULL,'2026-10-20 12:38:50.486454');
INSERT INTO "audit_events" VALUES('98c90b4f-ff5f-4256-b1e3-a38b296bc1ff','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','8e570637-5401-43ba-8ecd-6e8712275aad','Distress mode: SIREN at 13.08270, 80.27070 (SMS Dispatched: False)',NULL,'2026-10-20 12:39:01.467156');
INSERT INTO "audit_events" VALUES('076e8cbd-8b0a-4c2a-8afd-e83b16ad96cd','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','8e570637-5401-43ba-8ecd-6e8712275aad','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:44:35.741408');
INSERT INTO "audit_events" VALUES('f43bd6f1-f49e-40c6-a1d0-f2facd96c69f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','d562f7cd-dc86-4075-bd5e-57a47fe613ac','Distress mode: HOTKEY at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:44:56.937822');
INSERT INTO "audit_events" VALUES('d160630b-e80c-4292-8aab-b7b4474fb6a5','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','d562f7cd-dc86-4075-bd5e-57a47fe613ac','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:44:57.320163');
INSERT INTO "audit_events" VALUES('4518ecbc-f029-4452-b16e-c39fe0bcd394','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','6fb9741e-e61e-40be-8e7b-0a218d4d8c81','Distress mode: HOTKEY at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:45:03.323164');
INSERT INTO "audit_events" VALUES('e3653859-e2af-4feb-b5eb-e6f578d71cd8','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','6fb9741e-e61e-40be-8e7b-0a218d4d8c81','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:45:08.174283');
INSERT INTO "audit_events" VALUES('6930e66a-af15-416a-9531-3d2979536219','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','582b0d89-0ef2-478a-89c3-084382558867','Distress mode: SILENT at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:45:10.052060');
INSERT INTO "audit_events" VALUES('a2735fe5-7e15-4964-9c0d-8b34c4bcc070','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','582b0d89-0ef2-478a-89c3-084382558867','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:45:11.118474');
INSERT INTO "audit_events" VALUES('b541fbd9-ef3c-496d-a22e-2cf17fe5009c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','baf040be-d425-4a4c-a1b1-c68976d4debe','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:45:19.087824');
INSERT INTO "audit_events" VALUES('0d128191-afeb-4f13-b44d-b610e2d6ac4e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','2d7ced88-0982-45a9-b818-da9d6820b6ad','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:45:19.149917');
INSERT INTO "audit_events" VALUES('594e049d-35ed-442c-bfdb-a14dabc46866','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','baf040be-d425-4a4c-a1b1-c68976d4debe','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:45:20.840701');
INSERT INTO "audit_events" VALUES('10067ca4-eee0-477f-a265-e98dae321723','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','2d7ced88-0982-45a9-b818-da9d6820b6ad','Distress mode: SILENT at 10.95440, 76.99380 (SMS Dispatched: False)','127.0.0.1','2026-10-20 12:45:22.854328');
INSERT INTO "audit_events" VALUES('11e1b8e0-3ab6-40c7-bbb4-b69d5fa08512','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','2d7ced88-0982-45a9-b818-da9d6820b6ad','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:45:31.555570');
INSERT INTO "audit_events" VALUES('ba3354b6-82a1-45e3-87fa-aa5a34d0907f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','c8c51331-1211-449d-b370-9342d59f5d5c','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:46:02.965214');
INSERT INTO "audit_events" VALUES('90448f7e-2064-4f08-8a5f-84f9b0d9504e','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','c8c51331-1211-449d-b370-9342d59f5d5c','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: False)','127.0.0.1','2026-10-20 12:46:03.003043');
INSERT INTO "audit_events" VALUES('f1689fec-f157-419d-87ed-26f4285589b2','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','c8c51331-1211-449d-b370-9342d59f5d5c','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:46:23.703112');
INSERT INTO "audit_events" VALUES('10c481ce-7fba-428c-8e1c-7a155dd88bcb','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','d291ea14-a151-4aaa-b81d-d4b769c49f89','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:51:32.097545');
INSERT INTO "audit_events" VALUES('08c43875-38b7-4b9d-bcd2-27f526462876','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SOS_TRIGGERED','INCIDENT','ad9628c9-de85-4717-95f9-e6c042f275bd','Distress mode: SIREN at 10.95440, 76.99380 (SMS Dispatched: True)','127.0.0.1','2026-10-20 12:51:32.172678');
INSERT INTO "audit_events" VALUES('f2a963eb-1bc8-4fc8-8743-cdf7b933f303','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','d291ea14-a151-4aaa-b81d-d4b769c49f89','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:51:37.455819');
INSERT INTO "audit_events" VALUES('a0165c87-5317-4fab-b04d-fcd88898e02a','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','INCIDENT_RESOLVED','INCIDENT','ad9628c9-de85-4717-95f9-e6c042f275bd','Resolved with status RESOLVED. Notes: User terminated distress session.','127.0.0.1','2026-10-20 12:53:46.301697');
INSERT INTO "audit_events" VALUES('f4f5807b-1593-4c5c-b0cf-181613363505','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 12:54:20.265279');
INSERT INTO "audit_events" VALUES('c3d74fb8-fe8d-4146-a578-07fb8fc84396','52d03d73-9539-451c-989a-9729c55a52d8','USER_LOGIN','USER',NULL,'User admin@rakai.safe logged in (ADMIN)','127.0.0.1','2026-10-20 12:55:11.578630');
INSERT INTO "audit_events" VALUES('7d36a02c-adf1-4d89-8233-99b80e96fa96','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 12:57:52.286653');
INSERT INTO "audit_events" VALUES('47f5afff-502b-4c84-9aec-85313f7ed4b4','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 13:05:07.742974');
INSERT INTO "audit_events" VALUES('1b8c09aa-b251-4fa0-8758-f547d001c125','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 16:31:03.510515');
INSERT INTO "audit_events" VALUES('74197171-280f-4f5d-922f-3d6ffb6ea7f7','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','239589d0-f516-4c18-8dda-f7af4d8d4a78','Status changed from ACTIVE to ACKNOWLEDGED. Notes: None','127.0.0.1','2026-10-20 16:31:22.097723');
INSERT INTO "audit_events" VALUES('f56e8687-1d6e-4b43-8952-afb776d4fe1b','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','239589d0-f516-4c18-8dda-f7af4d8d4a78','Status changed from ACKNOWLEDGED to ON_SCENE. Notes: None','127.0.0.1','2026-10-20 16:31:23.053150');
INSERT INTO "audit_events" VALUES('3b0ebde4-5aeb-4fff-93f2-57a1e9177c6e','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','239589d0-f516-4c18-8dda-f7af4d8d4a78','Status changed from ON_SCENE to RESOLVED. Notes: None','127.0.0.1','2026-10-20 16:31:23.929788');
INSERT INTO "audit_events" VALUES('907da56c-a211-4d80-b3a6-c831b703bc3d','39fe0e80-4181-4661-a444-f36789fba696','INCIDENT_STATUS_CHANGE','INCIDENT','239589d0-f516-4c18-8dda-f7af4d8d4a78','Status changed from RESOLVED to DISPATCHED. Notes: None','127.0.0.1','2026-10-20 16:31:24.906159');
INSERT INTO "audit_events" VALUES('14b8f11a-552d-413b-9bbd-407a117556da','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 16:34:33.369071');
INSERT INTO "audit_events" VALUES('7cabea0b-49b4-4857-a69e-69ebc034b847','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 16:37:03.876256');
INSERT INTO "audit_events" VALUES('cf387f62-63a1-4e9c-bea6-dc8bab758bd6','39fe0e80-4181-4661-a444-f36789fba696','USER_LOGIN','USER',NULL,'User police@rakai.safe logged in (POLICE)','127.0.0.1','2026-10-20 16:56:13.445740');
INSERT INTO "audit_events" VALUES('1d84c42b-cf91-49c4-999a-8c34800200bf','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','USER_LOGIN','USER',NULL,'User user@rakai.safe logged in (USER)','127.0.0.1','2026-10-20 16:57:22.345508');
CREATE TABLE emergency_contacts (
	id VARCHAR NOT NULL, 
	user_id VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	phone VARCHAR NOT NULL, 
	relation_type VARCHAR, 
	priority INTEGER, 
	notify_sms BOOLEAN, 
	notify_whatsapp BOOLEAN, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
INSERT INTO "emergency_contacts" VALUES('9423a22e-592c-4dc6-8e5e-940ff0e8c409','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+916380173079','Mother',1,1,1,'2026-10-20 09:26:48.197558');
INSERT INTO "emergency_contacts" VALUES('7456f3d4-74b4-4bcc-b45c-0a5da0b3db2d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+916380173079','Sister',2,1,1,'2026-10-20 09:26:48.197568');
INSERT INTO "emergency_contacts" VALUES('7be5ec28-c0d9-4ec2-9c34-7b0377f62540','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 6380173079','Friend',3,1,1,'2026-10-20 12:23:53.995599');
CREATE TABLE emergency_incidents (
	id VARCHAR NOT NULL, 
	user_id VARCHAR NOT NULL, 
	mode VARCHAR NOT NULL, 
	status VARCHAR NOT NULL, 
	initial_latitude FLOAT NOT NULL, 
	initial_longitude FLOAT NOT NULL, 
	current_latitude FLOAT NOT NULL, 
	current_longitude FLOAT NOT NULL, 
	accuracy_meters FLOAT, 
	jurisdiction VARCHAR, 
	assigned_police_id VARCHAR, 
	responder_notes TEXT, 
	created_at DATETIME, 
	acknowledged_at DATETIME, 
	resolved_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(assigned_police_id) REFERENCES users (id)
);
INSERT INTO "emergency_incidents" VALUES('4c2f5431-88bd-4fc2-a519-fd55927822b4','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,5.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[2026-10-20 09:27:06 UTC | Officer Inspector Rajan (ACKNOWLEDGED)]: Unit 4 dispatched to Park Town square.
[RESOLVED] User terminated distress session.','2026-10-20 09:27:05.594181','2026-10-20 09:27:06.230987','2026-10-20 09:27:06.269108');
INSERT INTO "emergency_incidents" VALUES('2321d5ae-434a-4236-b9f1-a369caf2292d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,5.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[2026-10-20 09:30:04 UTC | Officer Inspector Rajan (ACKNOWLEDGED)]: Unit 4 dispatched to Park Town square.
[RESOLVED] User terminated distress session.','2026-10-20 09:30:04.045897','2026-10-20 09:30:04.600543','2026-10-20 09:30:04.634181');
INSERT INTO "emergency_incidents" VALUES('d300eb0d-3e78-42cd-880b-493ed819a448','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,50.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 09:47:53.330598',NULL,'2026-10-20 09:48:09.702510');
INSERT INTO "emergency_incidents" VALUES('d5946df6-a5aa-400e-a683-a7f96678bda3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,50.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 09:47:53.327293',NULL,'2026-10-20 09:49:25.851713');
INSERT INTO "emergency_incidents" VALUES('ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 09:51:44.757622',NULL,'2026-10-20 09:51:47.004813');
INSERT INTO "emergency_incidents" VALUES('ced8d6d4-6e33-4666-89e5-11e1f7af790c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,50.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 10:10:36.434650',NULL,'2026-10-20 10:11:43.288665');
INSERT INTO "emergency_incidents" VALUES('2947a354-2bae-43a9-a04f-9d0f398e632f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,50.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 10:10:36.441974',NULL,'2026-10-20 10:18:31.490889');
INSERT INTO "emergency_incidents" VALUES('95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SILENT','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[RESOLVED] User terminated distress session.
[RESOLVED] User terminated distress session.','2026-10-20 10:18:35.664091','2026-10-20 10:33:17.361307','2026-10-20 11:19:11.612915');
INSERT INTO "emergency_incidents" VALUES('beb909d3-f1e9-481e-8bc2-1cf972eca804','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SILENT','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 10:32:40.932842',NULL,'2026-10-20 11:25:57.604516');
INSERT INTO "emergency_incidents" VALUES('239589d0-f516-4c18-8dda-f7af4d8d4a78','52d03d73-9539-451c-989a-9729c55a52d8','SIREN','DISPATCHED',13.0827,80.2707,13.0827,80.2707,50.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696',NULL,'2026-10-20 10:42:48.213830','2026-10-20 16:31:22.081132','2026-10-20 16:31:23.911834');
INSERT INTO "emergency_incidents" VALUES('ea87181c-9e6a-494f-bfd0-bc81f6437ef9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:11:31.352521',NULL,'2026-10-20 12:11:39.646676');
INSERT INTO "emergency_incidents" VALUES('1f7f6f52-ff5a-427b-81a7-be9235f348b9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,13.0827,80.2707,5.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[2026-10-20 12:17:26 UTC | Officer Inspector Rajan (ACKNOWLEDGED)]: Unit 4 dispatched to Park Town square.
[RESOLVED] User terminated distress session.','2026-10-20 12:11:31.353975','2026-10-20 12:17:26.855988','2026-10-20 12:17:26.886668');
INSERT INTO "emergency_incidents" VALUES('3120059c-42c6-41b6-a266-744f0890135b','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,5.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[2026-10-20 12:18:04 UTC | Officer Inspector Rajan (ACKNOWLEDGED)]: Unit 4 dispatched to Park Town square.
[RESOLVED] User terminated distress session.','2026-10-20 12:18:03.557329','2026-10-20 12:18:04.028941','2026-10-20 12:18:04.054672');
INSERT INTO "emergency_incidents" VALUES('ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,13.0827,80.2707,5.0,'Central Zone','39fe0e80-4181-4661-a444-f36789fba696','[2026-10-20 12:22:33 UTC | Officer Inspector Rajan (ACKNOWLEDGED)]: Unit 4 dispatched to Park Town square.
[RESOLVED] User terminated distress session.','2026-10-20 12:22:33.166736','2026-10-20 12:22:33.639993','2026-10-20 12:22:33.669249');
INSERT INTO "emergency_incidents" VALUES('8e570637-5401-43ba-8ecd-6e8712275aad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',13.0827,80.2707,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:38:50.441542',NULL,'2026-10-20 12:44:35.708008');
INSERT INTO "emergency_incidents" VALUES('d562f7cd-dc86-4075-bd5e-57a47fe613ac','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','HOTKEY','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:44:56.687411',NULL,'2026-10-20 12:44:57.218805');
INSERT INTO "emergency_incidents" VALUES('6fb9741e-e61e-40be-8e7b-0a218d4d8c81','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','HOTKEY','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:45:03.231712',NULL,'2026-10-20 12:45:08.123399');
INSERT INTO "emergency_incidents" VALUES('582b0d89-0ef2-478a-89c3-084382558867','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SILENT','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:45:09.918858',NULL,'2026-10-20 12:45:11.090155');
INSERT INTO "emergency_incidents" VALUES('baf040be-d425-4a4c-a1b1-c68976d4debe','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:45:18.906942',NULL,'2026-10-20 12:45:20.822731');
INSERT INTO "emergency_incidents" VALUES('2d7ced88-0982-45a9-b818-da9d6820b6ad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:45:18.901586',NULL,'2026-10-20 12:45:31.511771');
INSERT INTO "emergency_incidents" VALUES('c8c51331-1211-449d-b370-9342d59f5d5c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:46:02.932174',NULL,'2026-10-20 12:46:23.668817');
INSERT INTO "emergency_incidents" VALUES('d291ea14-a151-4aaa-b81d-d4b769c49f89','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:51:32.057523',NULL,'2026-10-20 12:51:37.438950');
INSERT INTO "emergency_incidents" VALUES('ad9628c9-de85-4717-95f9-e6c042f275bd','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','SIREN','RESOLVED',10.9544,76.9938,10.9544,76.9938,100000.0,'Central Zone',NULL,'[RESOLVED] User terminated distress session.','2026-10-20 12:51:32.059448',NULL,'2026-10-20 12:53:46.284503');
CREATE TABLE incident_location_snapshots (
	id VARCHAR NOT NULL, 
	incident_id VARCHAR NOT NULL, 
	latitude FLOAT NOT NULL, 
	longitude FLOAT NOT NULL, 
	accuracy FLOAT, 
	recorded_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(incident_id) REFERENCES emergency_incidents (id) ON DELETE CASCADE
);
INSERT INTO "incident_location_snapshots" VALUES('c34101bb-d507-4606-96e0-1ed9e05dc371','4c2f5431-88bd-4fc2-a519-fd55927822b4',13.0827,80.2707,5.0,'2026-10-20 09:27:05.607418');
INSERT INTO "incident_location_snapshots" VALUES('0f3c1c02-ead8-4173-9dc6-5e883ab648c8','2321d5ae-434a-4236-b9f1-a369caf2292d',13.0827,80.2707,5.0,'2026-10-20 09:30:04.056170');
INSERT INTO "incident_location_snapshots" VALUES('56b4e2df-d518-4599-9961-fcce03a9b30d','d300eb0d-3e78-42cd-880b-493ed819a448',13.0827,80.2707,50.0,'2026-10-20 09:47:53.348359');
INSERT INTO "incident_location_snapshots" VALUES('d3d26116-c1c9-47cd-a256-15cfbfe42523','d5946df6-a5aa-400e-a683-a7f96678bda3',13.0827,80.2707,50.0,'2026-10-20 09:47:53.414157');
INSERT INTO "incident_location_snapshots" VALUES('78ca7322-b4fe-4628-83d6-1ade2582aa32','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150',10.9544,76.9938,100000.0,'2026-10-20 09:51:44.907682');
INSERT INTO "incident_location_snapshots" VALUES('8072e06f-0f27-4583-8696-7e5dc807bb90','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150',10.9544,76.9938,100000.0,'2026-10-20 09:51:44.919984');
INSERT INTO "incident_location_snapshots" VALUES('46674b03-8e2f-4355-abd2-8641b55b59cb','2947a354-2bae-43a9-a04f-9d0f398e632f',13.0827,80.2707,50.0,'2026-10-20 10:10:36.474399');
INSERT INTO "incident_location_snapshots" VALUES('78f69e70-79ba-4665-b735-69fc264474ec','ced8d6d4-6e33-4666-89e5-11e1f7af790c',13.0827,80.2707,50.0,'2026-10-20 10:10:36.462201');
INSERT INTO "incident_location_snapshots" VALUES('cf0ad1d3-f119-40ed-b4d8-0ca4de518cdd','95cb5a78-e338-476b-a03e-548431c8ab5d',10.9544,76.9938,100000.0,'2026-10-20 10:18:35.735363');
INSERT INTO "incident_location_snapshots" VALUES('66063455-f9c3-44e4-a4ca-d75ac57be7e0','95cb5a78-e338-476b-a03e-548431c8ab5d',10.9544,76.9938,100000.0,'2026-10-20 10:18:41.466960');
INSERT INTO "incident_location_snapshots" VALUES('2cfc6a66-7a90-4b7d-8c38-f44a80b67fbc','95cb5a78-e338-476b-a03e-548431c8ab5d',10.9544,76.9938,100000.0,'2026-10-20 10:18:41.471480');
INSERT INTO "incident_location_snapshots" VALUES('9302b428-c4ed-4cd1-9733-1759693aefc5','beb909d3-f1e9-481e-8bc2-1cf972eca804',10.9544,76.9938,100000.0,'2026-10-20 10:32:40.959321');
INSERT INTO "incident_location_snapshots" VALUES('a417d48c-af43-446f-8dd7-8b9ef55f9cbf','239589d0-f516-4c18-8dda-f7af4d8d4a78',13.0827,80.2707,50.0,'2026-10-20 10:42:48.235188');
INSERT INTO "incident_location_snapshots" VALUES('d0dd3c61-4d47-4bd3-8c0c-14aa4c4bd222','ea87181c-9e6a-494f-bfd0-bc81f6437ef9',10.9544,76.9938,100000.0,'2026-10-20 12:11:31.368377');
INSERT INTO "incident_location_snapshots" VALUES('3ad05829-0e2a-4fba-aa2f-454df5a18219','1f7f6f52-ff5a-427b-81a7-be9235f348b9',10.9544,76.9938,100000.0,'2026-10-20 12:11:31.402269');
INSERT INTO "incident_location_snapshots" VALUES('70f7a107-2c03-4093-8440-cd62d637d438','1f7f6f52-ff5a-427b-81a7-be9235f348b9',13.0827,80.2707,5.0,'2026-10-20 12:17:26.383109');
INSERT INTO "incident_location_snapshots" VALUES('c3b55e08-f689-4a74-8789-5de5a66004a5','3120059c-42c6-41b6-a266-744f0890135b',13.0827,80.2707,5.0,'2026-10-20 12:18:03.568960');
INSERT INTO "incident_location_snapshots" VALUES('ba19540f-9a53-43dd-b1f3-5fefd78a24b2','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d',13.0827,80.2707,5.0,'2026-10-20 12:22:33.180840');
INSERT INTO "incident_location_snapshots" VALUES('705fa84d-5c39-47f2-bcd1-5d4550789b49','8e570637-5401-43ba-8ecd-6e8712275aad',13.0827,80.2707,10.0,'2026-10-20 12:38:50.458027');
INSERT INTO "incident_location_snapshots" VALUES('954db325-b1e8-4050-bffd-79dfef98f468','8e570637-5401-43ba-8ecd-6e8712275aad',13.0827,80.2707,10.0,'2026-10-20 12:39:01.453470');
INSERT INTO "incident_location_snapshots" VALUES('18f6b4eb-268a-4ca8-b036-cf14a38e1a64','8e570637-5401-43ba-8ecd-6e8712275aad',10.9544,76.9938,100000.0,'2026-10-20 12:44:21.256757');
INSERT INTO "incident_location_snapshots" VALUES('69476e2f-e41f-4f38-9818-a3980e881677','8e570637-5401-43ba-8ecd-6e8712275aad',10.9544,76.9938,100000.0,'2026-10-20 12:44:30.626456');
INSERT INTO "incident_location_snapshots" VALUES('d18dcf2b-fa6d-4713-99c6-3611f3f40978','d562f7cd-dc86-4075-bd5e-57a47fe613ac',10.9544,76.9938,100000.0,'2026-10-20 12:44:56.763239');
INSERT INTO "incident_location_snapshots" VALUES('e2f319a9-2038-40f8-8d55-14f2cf874b47','d562f7cd-dc86-4075-bd5e-57a47fe613ac',10.9544,76.9938,100000.0,'2026-10-20 12:44:57.025152');
INSERT INTO "incident_location_snapshots" VALUES('e50b1cee-4061-41ab-8866-f12aeaad9f85','6fb9741e-e61e-40be-8e7b-0a218d4d8c81',10.9544,76.9938,100000.0,'2026-10-20 12:45:03.259772');
INSERT INTO "incident_location_snapshots" VALUES('5d5c5b81-dc91-4526-a945-5c6324a3babf','6fb9741e-e61e-40be-8e7b-0a218d4d8c81',10.9544,76.9938,100000.0,'2026-10-20 12:45:03.438525');
INSERT INTO "incident_location_snapshots" VALUES('cebaa847-0326-4bd8-b624-608af36056ac','6fb9741e-e61e-40be-8e7b-0a218d4d8c81',10.9544,76.9938,100000.0,'2026-10-20 12:45:07.147248');
INSERT INTO "incident_location_snapshots" VALUES('5cf7a25e-ffec-4f74-89e5-f586c710fb71','582b0d89-0ef2-478a-89c3-084382558867',10.9544,76.9938,100000.0,'2026-10-20 12:45:09.949523');
INSERT INTO "incident_location_snapshots" VALUES('9f98fc8f-0cc5-455c-9661-e0e8bd5d7601','582b0d89-0ef2-478a-89c3-084382558867',10.9544,76.9938,100000.0,'2026-10-20 12:45:10.177125');
INSERT INTO "incident_location_snapshots" VALUES('a334e23b-aa22-4060-b8f5-a03510932d26','582b0d89-0ef2-478a-89c3-084382558867',10.9544,76.9938,100000.0,'2026-10-20 12:45:10.944018');
INSERT INTO "incident_location_snapshots" VALUES('b10cb3ca-d3d9-428d-87f6-79a403a17bbd','baf040be-d425-4a4c-a1b1-c68976d4debe',10.9544,76.9938,100000.0,'2026-10-20 12:45:18.926712');
INSERT INTO "incident_location_snapshots" VALUES('64baaff8-edcd-4e6b-8e38-86f6d0f984a6','2d7ced88-0982-45a9-b818-da9d6820b6ad',10.9544,76.9938,100000.0,'2026-10-20 12:45:18.967844');
INSERT INTO "incident_location_snapshots" VALUES('dd600baf-4001-4140-a785-3a41d7061aa7','baf040be-d425-4a4c-a1b1-c68976d4debe',10.9544,76.9938,100000.0,'2026-10-20 12:45:19.224257');
INSERT INTO "incident_location_snapshots" VALUES('ed2ca27c-0355-41c7-b190-439dffa8d6c4','baf040be-d425-4a4c-a1b1-c68976d4debe',10.9544,76.9938,100000.0,'2026-10-20 12:45:19.498282');
INSERT INTO "incident_location_snapshots" VALUES('26cfe288-bdaf-48fa-ba36-81576de843c1','2d7ced88-0982-45a9-b818-da9d6820b6ad',10.9544,76.9938,100000.0,'2026-10-20 12:45:22.832606');
INSERT INTO "incident_location_snapshots" VALUES('534d1eee-b18d-41e2-aa66-01d02d776f75','2d7ced88-0982-45a9-b818-da9d6820b6ad',10.9544,76.9938,100000.0,'2026-10-20 12:45:22.965794');
INSERT INTO "incident_location_snapshots" VALUES('11a489d8-4485-4e93-9783-0febee37fa48','2d7ced88-0982-45a9-b818-da9d6820b6ad',10.9544,76.9938,100000.0,'2026-10-20 12:45:28.927502');
INSERT INTO "incident_location_snapshots" VALUES('3004ad2e-4634-4d4a-9bad-5b0dbb0f3535','c8c51331-1211-449d-b370-9342d59f5d5c',10.9544,76.9938,100000.0,'2026-10-20 12:46:02.944726');
INSERT INTO "incident_location_snapshots" VALUES('2a67a899-cfbe-4f29-afd5-d51f7dd437a4','c8c51331-1211-449d-b370-9342d59f5d5c',10.9544,76.9938,100000.0,'2026-10-20 12:46:02.969291');
INSERT INTO "incident_location_snapshots" VALUES('ec32516e-3946-421c-b63c-d5f7746afe75','c8c51331-1211-449d-b370-9342d59f5d5c',10.9544,76.9938,100000.0,'2026-10-20 12:46:03.698854');
INSERT INTO "incident_location_snapshots" VALUES('c8bf7980-02a8-4654-ae9c-ace7d8e9baba','c8c51331-1211-449d-b370-9342d59f5d5c',10.9544,76.9938,100000.0,'2026-10-20 12:46:04.601924');
INSERT INTO "incident_location_snapshots" VALUES('12ea3629-b885-4557-96fa-f46604ad8f5a','d291ea14-a151-4aaa-b81d-d4b769c49f89',10.9544,76.9938,100000.0,'2026-10-20 12:51:32.069171');
INSERT INTO "incident_location_snapshots" VALUES('810c54ba-b6c6-419d-ba0d-dae2da5f1eeb','ad9628c9-de85-4717-95f9-e6c042f275bd',10.9544,76.9938,100000.0,'2026-10-20 12:51:32.130246');
INSERT INTO "incident_location_snapshots" VALUES('182c8a71-65eb-478e-bb41-a457d5dd4937','d291ea14-a151-4aaa-b81d-d4b769c49f89',10.9544,76.9938,100000.0,'2026-10-20 12:51:32.168550');
INSERT INTO "incident_location_snapshots" VALUES('4731dd80-cc1b-4bb5-8074-20be31994718','d291ea14-a151-4aaa-b81d-d4b769c49f89',10.9544,76.9938,100000.0,'2026-10-20 12:51:32.350058');
INSERT INTO "incident_location_snapshots" VALUES('6a7bba07-d538-4586-8867-dd509c90c3dd','ad9628c9-de85-4717-95f9-e6c042f275bd',10.9544,76.9938,100000.0,'2026-10-20 12:52:42.499674');
CREATE TABLE infrastructure_places (
	id VARCHAR NOT NULL, 
	category VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	name_tamil VARCHAR, 
	address VARCHAR NOT NULL, 
	phone VARCHAR, 
	latitude FLOAT NOT NULL, 
	longitude FLOAT NOT NULL, 
	jurisdiction VARCHAR, 
	is_verified BOOLEAN, 
	verified_by_admin_id VARCHAR, 
	operating_hours VARCHAR, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(verified_by_admin_id) REFERENCES users (id)
);
INSERT INTO "infrastructure_places" VALUES('1e6f5141-d9e0-4bd3-83ce-336580bf43ba','POLICE_STATION','All-Women Police Station - Central','அனைத்து மகளிர் காவல் நிலையம் (மத்திய மண்டலம்)','EVR Periyar Salai, Park Town, Chennai','044-25383561',13.0838,80.2705,'Central Zone',1,NULL,'24/7 Active Police Desk','2026-10-20 09:26:48.207790');
INSERT INTO "infrastructure_places" VALUES('1ff70922-543b-499c-b072-73ec5bd4d795','POLICE_STATION','Flower Bazaar Police Station','பூக்கடை காவல் நிலையம்','NSC Bose Road, George Town, Chennai','044-25361200',13.091,80.283,'Central Zone',1,NULL,'24/7 Police Assistance','2026-10-20 09:26:48.207801');
INSERT INTO "infrastructure_places" VALUES('643527cc-c3b5-4afa-95d6-dae2806a8506','HOSPITAL','Rajiv Gandhi Government General Hospital (Trauma 24/7)','ராஜீவ் காந்தி அரசு பொது மருத்துவமனை (அவசர பிரிவு)','EVR Periyar High Road, Park Town, Chennai','044-25305000',13.0792,80.2785,'Central Zone',1,NULL,'24/7 Emergency & ICU','2026-10-20 09:26:48.207826');
INSERT INTO "infrastructure_places" VALUES('67fa8e85-4c5e-4ac3-826d-1a82af203a9d','HOSPITAL','Apollo Children''s & Women''s Hospital','அப்பல்லோ குழந்தைகள் & பெண்கள் மருத்துவமனை','Shafee Mohammed Road, Thousand Lights, Chennai','044-28296240',13.061,80.252,'South Zone',1,NULL,'24/7 Emergency Services','2026-10-20 09:26:48.207831');
INSERT INTO "infrastructure_places" VALUES('df3d1f9e-abdd-4e67-b76f-c89fa9234445','SAFE_HAVEN','Central Metro Station - CCTV Monitored Safe Haven','சென்ட்ரல் மெட்ரோ நிலையம் (பாதுகாப்பு மையம்)','Underground Concourse, Central Railway Square','044-25381122',13.0815,80.273,'Central Zone',1,NULL,'05:00 AM - 11:30 PM (Security Staff On Duty)','2026-10-20 09:26:48.207836');
INSERT INTO "infrastructure_places" VALUES('28eae290-50ed-4408-816f-c4a7dc838ff1','SAFE_HAVEN','Ripon Building Transit Helpdesk & Kiosk','ரிப்பன் மாளிகை மக்கள் பாதுகாப்பு மையம்','Sydenhams Road, Periyamet, Chennai','044-25619200',13.0827,80.2715,'Central Zone',1,NULL,'24/7 Municipal Guard Post','2026-10-20 09:26:48.207840');
INSERT INTO "infrastructure_places" VALUES('f3b3e3e8-0add-45db-81bd-7165d689bf01','POLICE_STATION','All-Women Police Station - Coimbatore Central','அனைத்து மகளிர் காவல் நிலையம் (கோவை மத்திய மண்டலம்)','Old Post Office Road, Opp. Collectorate, Gopalapuram, Coimbatore','+91 6380173079',10.9982,76.9644,'Coimbatore Central',1,NULL,'24/7 Active Women Police Desk','2026-10-20 13:01:55.133002');
INSERT INTO "infrastructure_places" VALUES('e7b644bc-d6d5-4708-8639-996b8f878821','POLICE_STATION','Singanallur All-Women Police Station & Women Helpline','சிங்காநல்லூர் அனைத்து மகளிர் காவல் நிலையம்','Trichy Main Road, Singanallur, Coimbatore','+91 6380173079',10.9964,77.0255,'Coimbatore East',1,NULL,'24/7 Women Helpline & Patrol','2026-10-20 13:01:55.133016');
INSERT INTO "infrastructure_places" VALUES('568d5e0d-b540-43e0-b90a-d2d0c7686b14','HOSPITAL','Coimbatore Medical College Hospital (CMCH 24/7 Trauma)','கோவை அரசு மருத்துவக் கல்லூரி மருத்துவமனை (அவசர பிரிவு)','Trichy Road, Gopalapuram, Coimbatore','+91 6380173079',11.0015,76.9712,'Coimbatore Central',1,NULL,'24/7 Emergency & Critical Care','2026-10-20 13:01:55.133022');
INSERT INTO "infrastructure_places" VALUES('13969790-fbe6-4252-aa39-c0d3293e58cb','HOSPITAL','KG Hospital & Heart Centre (Emergency & ICU)','கேஜி மருத்துவமனை (24 மணி நேர அவசர பிரிவு)','Govt Arts College Road, Gopalapuram, Coimbatore','+91 6380173079',10.9975,76.9688,'Coimbatore Central',1,NULL,'24/7 Trauma & Emergency Support','2026-10-20 13:01:55.133027');
INSERT INTO "infrastructure_places" VALUES('5ff6a145-6699-400f-939a-6eab48afb7ee','SAFE_HAVEN','Gandhipuram Transit Central Safe Haven & Helpdesk','காந்திபுரம் ஒருங்கிணைந்த பாதுகாப்பு மையம்','Central Bus Stand Concourse, Gandhipuram, Coimbatore','+91 6380173079',11.0168,76.9678,'Coimbatore Central',1,NULL,'24/7 Monitored CCTV Sanctuary & Helpdesk','2026-10-20 13:01:55.133032');
INSERT INTO "infrastructure_places" VALUES('ed40fa50-9ab4-4087-a4a1-d12dff5e81e1','SAFE_HAVEN','Coimbatore Railway Junction Safety Helpdesk','கோவை சந்திப்பு ரயில் நிலையம் பாதுகாப்பு மையம்','Station Concourse, State Bank Road, Coimbatore','+91 6380173079',10.9962,76.9682,'Coimbatore Central',1,NULL,'24/7 RPF & Citizen Safety Desk','2026-10-20 13:01:55.133036');
CREATE TABLE location_sharing_sessions (
	id VARCHAR NOT NULL, 
	user_id VARCHAR NOT NULL, 
	token VARCHAR, 
	current_latitude FLOAT, 
	current_longitude FLOAT, 
	expires_at DATETIME NOT NULL, 
	is_active BOOLEAN, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
INSERT INTO "location_sharing_sessions" VALUES('cceb7daa-e8f1-42fb-babd-74cc9071bfd4','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','38045129-3e7a-40a8-8c3d-6fe61c658131',10.9544,76.9938,'2026-10-20 11:18:12.904921',1,'2026-10-20 10:18:12.913205');
CREATE TABLE notification_logs (
	id VARCHAR NOT NULL, 
	incident_id VARCHAR, 
	user_id VARCHAR NOT NULL, 
	recipient_name VARCHAR NOT NULL, 
	recipient_phone VARCHAR NOT NULL, 
	channel VARCHAR, 
	status VARCHAR, 
	message_body TEXT NOT NULL, 
	provider_reference VARCHAR, 
	provider_status_code VARCHAR, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(incident_id) REFERENCES emergency_incidents (id) ON DELETE SET NULL, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
INSERT INTO "notification_logs" VALUES('7635a3e9-f9a5-4326-9c11-5e997d3f64bc','4c2f5431-88bd-4fc2-a519-fd55927822b4','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_1E42391F9982','CARRIER_ACK_DELIVERED','2026-10-20 09:27:05.621507');
INSERT INTO "notification_logs" VALUES('07428f65-602a-4922-a1b5-ee25d910810b','4c2f5431-88bd-4fc2-a519-fd55927822b4','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_0BCCCBAC862A','CARRIER_ACK_DELIVERED','2026-10-20 09:27:05.621525');
INSERT INTO "notification_logs" VALUES('3c33fb2f-4bd2-4808-9a0c-05e83348e2a9','2321d5ae-434a-4236-b9f1-a369caf2292d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_DF23EA5EE920','CARRIER_ACK_DELIVERED','2026-10-20 09:30:04.066729');
INSERT INTO "notification_logs" VALUES('d9c708bd-3009-4f92-98a4-928727728785','2321d5ae-434a-4236-b9f1-a369caf2292d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_48CA395826F3','CARRIER_ACK_DELIVERED','2026-10-20 09:30:04.066738');
INSERT INTO "notification_logs" VALUES('65777759-2e03-42b5-8f3f-00aef2959760','d300eb0d-3e78-42cd-880b-493ed819a448','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_093FDEEFBC6D','CARRIER_ACK_DELIVERED','2026-10-20 09:47:53.364932');
INSERT INTO "notification_logs" VALUES('4a360644-9762-4b19-8059-5fda2119e95a','d300eb0d-3e78-42cd-880b-493ed819a448','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_95C6D8CA5201','CARRIER_ACK_DELIVERED','2026-10-20 09:47:53.364942');
INSERT INTO "notification_logs" VALUES('51b738ec-9430-4a12-9ef6-55ce92d6d615','d5946df6-a5aa-400e-a683-a7f96678bda3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_FE35A64DFBE8','CARRIER_ACK_DELIVERED','2026-10-20 09:47:53.427323');
INSERT INTO "notification_logs" VALUES('015bc718-c424-4155-86ba-88e718d67dc8','d5946df6-a5aa-400e-a683-a7f96678bda3','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_5056615063BB','CARRIER_ACK_DELIVERED','2026-10-20 09:47:53.427337');
INSERT INTO "notification_logs" VALUES('2026547f-30f7-4d15-a5dc-bbdfe8e63b31','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_4B16C0BFFF41','CARRIER_ACK_DELIVERED','2026-10-20 09:51:44.957833');
INSERT INTO "notification_logs" VALUES('72857f1a-1889-4a45-b9d4-d7967b75c7d1','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_1969C351EDBB','CARRIER_ACK_DELIVERED','2026-10-20 09:51:44.957869');
INSERT INTO "notification_logs" VALUES('8089794c-04c0-4253-819c-ee3b22b43033','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_51B496F5E9E5','CARRIER_ACK_DELIVERED','2026-10-20 09:51:45.003692');
INSERT INTO "notification_logs" VALUES('a8438654-f543-45f2-866d-80bd28aec96f','ebde4404-1f0f-4e2d-ad86-1c2fec5ab150','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_666FECF581E3','CARRIER_ACK_DELIVERED','2026-10-20 09:51:45.003722');
INSERT INTO "notification_logs" VALUES('823a1b96-87c8-440a-a30d-40cb16f625ea','2947a354-2bae-43a9-a04f-9d0f398e632f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_FA706551F24E','CARRIER_ACK_DELIVERED','2026-10-20 10:10:36.503206');
INSERT INTO "notification_logs" VALUES('b16b47d9-6263-48ea-b43e-73aaa39d2846','2947a354-2bae-43a9-a04f-9d0f398e632f','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_56663B3DFAC0','CARRIER_ACK_DELIVERED','2026-10-20 10:10:36.503240');
INSERT INTO "notification_logs" VALUES('e019fcc7-6773-4414-84ad-467dbb920ebd','ced8d6d4-6e33-4666-89e5-11e1f7af790c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_3BC254DFA831','CARRIER_ACK_DELIVERED','2026-10-20 10:10:36.533533');
INSERT INTO "notification_logs" VALUES('f7f77bd4-77ef-459a-81b8-d59350d5c127','ced8d6d4-6e33-4666-89e5-11e1f7af790c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=13.0827,80.2707
Coords: 13.08270, 80.27070
Please dispatch assistance immediately.','SMS_GW_06FB515B493A','CARRIER_ACK_DELIVERED','2026-10-20 10:10:36.533574');
INSERT INTO "notification_logs" VALUES('84a6285c-8592-453a-a286-86b894c5b4d9','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_898B5CEA2C02','CARRIER_ACK_DELIVERED','2026-10-20 10:18:35.840987');
INSERT INTO "notification_logs" VALUES('f68f0803-7a95-4a18-bdbb-a98ceecd2005','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_7C1EB5D12C9E','CARRIER_ACK_DELIVERED','2026-10-20 10:18:35.841018');
INSERT INTO "notification_logs" VALUES('080e00ea-b76a-479b-8628-a49ca16ee864','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_78028498516D','CARRIER_ACK_DELIVERED','2026-10-20 10:18:41.512123');
INSERT INTO "notification_logs" VALUES('18b8e036-c511-4fab-ac35-a6f0a6c8a268','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_87F19A9B8667','CARRIER_ACK_DELIVERED','2026-10-20 10:18:41.512185');
INSERT INTO "notification_logs" VALUES('74cf2c89-1012-4945-928e-84cdaceef0fd','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_E3E2432189E2','CARRIER_ACK_DELIVERED','2026-10-20 10:18:41.529996');
INSERT INTO "notification_logs" VALUES('98a6654d-dfc9-4324-a2c0-e6792ed520a1','95cb5a78-e338-476b-a03e-548431c8ab5d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_FAB064EE5616','CARRIER_ACK_DELIVERED','2026-10-20 10:18:41.530027');
INSERT INTO "notification_logs" VALUES('62a2b62d-ec24-43ff-ab21-c7c333c1f562','beb909d3-f1e9-481e-8bc2-1cf972eca804','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_697680676945','CARRIER_ACK_DELIVERED','2026-10-20 10:32:40.986995');
INSERT INTO "notification_logs" VALUES('3ced1511-651d-4724-b6d4-599f6f76e101','beb909d3-f1e9-481e-8bc2-1cf972eca804','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SILENT).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_C36175D10252','CARRIER_ACK_DELIVERED','2026-10-20 10:32:40.987029');
INSERT INTO "notification_logs" VALUES('136b7c6a-97f7-4ef7-b0b8-7a841d58ed37','1f7f6f52-ff5a-427b-81a7-be9235f348b9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_3BD21B992659','CARRIER_ACK_DELIVERED','2026-10-20 12:11:31.418575');
INSERT INTO "notification_logs" VALUES('1cd76094-ef3d-4511-a12e-7ba60749aece','1f7f6f52-ff5a-427b-81a7-be9235f348b9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_84A660A315F1','CARRIER_ACK_DELIVERED','2026-10-20 12:11:31.418591');
INSERT INTO "notification_logs" VALUES('bf1f1471-042b-4c82-8872-f75c6cd7fff2','ea87181c-9e6a-494f-bfd0-bc81f6437ef9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_AE639AD3C142','CARRIER_ACK_DELIVERED','2026-10-20 12:11:31.383278');
INSERT INTO "notification_logs" VALUES('8aaf398e-77d6-4b51-9dfc-04e268347f80','ea87181c-9e6a-494f-bfd0-bc81f6437ef9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','DELIVERED','🚨 RAKAI SAFE EMERGENCY ALERT!
Priya Sharma has activated distress mode (SIREN).
Location: https://www.google.com/maps/search/?api=1&query=10.9544,76.9938
Coords: 10.95440, 76.99380
Please dispatch assistance immediately.','SMS_GW_43BFF139BD85','CARRIER_ACK_DELIVERED','2026-10-20 12:11:31.383295');
INSERT INTO "notification_logs" VALUES('225fc80f-f666-4285-ab2f-5a100e87aa83','1f7f6f52-ff5a-427b-81a7-be9235f348b9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:11:31 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:17:26.390827');
INSERT INTO "notification_logs" VALUES('9715213b-0a4e-4cb0-a437-4b96c9b006aa','1f7f6f52-ff5a-427b-81a7-be9235f348b9','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:11:31 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:17:26.390940');
INSERT INTO "notification_logs" VALUES('a7e0f485-e765-4bcf-a9e1-918f65eb7086','3120059c-42c6-41b6-a266-744f0890135b','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:18:03 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:18:03.577692');
INSERT INTO "notification_logs" VALUES('e0f3e21f-5d36-47ed-8c47-1c599e5294f2','3120059c-42c6-41b6-a266-744f0890135b','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:18:03 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:18:03.577828');
INSERT INTO "notification_logs" VALUES('44fdf019-b368-4f4a-bbec-3658ae378934','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:22:33 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:22:33.191861');
INSERT INTO "notification_logs" VALUES('66873726-c781-442b-b541-e76f9779ca29','ce4b5ef8-07d1-4083-bd45-0e7fbc162e7d','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:22:33 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:22:33.191995');
INSERT INTO "notification_logs" VALUES('bddbd963-cdae-498a-bb0b-10bdfa38a2c3','8e570637-5401-43ba-8ecd-6e8712275aad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:38:50 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:38:50.470774');
INSERT INTO "notification_logs" VALUES('a5db8fff-c805-463b-b1f9-4eeee7a829c8','8e570637-5401-43ba-8ecd-6e8712275aad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:38:50 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:38:50.470900');
INSERT INTO "notification_logs" VALUES('fc0cbd0a-93ec-40ac-ad8f-f941e947398d','8e570637-5401-43ba-8ecd-6e8712275aad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=13.082700,80.270700

Please call me immediately.
Time: 2026-10-20 12:38:50 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:38:50.470952');
INSERT INTO "notification_logs" VALUES('2f5773e1-12f5-482d-b798-02e9761e3fef','d562f7cd-dc86-4075-bd5e-57a47fe613ac','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:44:56 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:44:56.869496');
INSERT INTO "notification_logs" VALUES('281eb82b-40f9-450f-b62e-30a0acbf6719','d562f7cd-dc86-4075-bd5e-57a47fe613ac','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:44:56 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:44:56.869842');
INSERT INTO "notification_logs" VALUES('3b8d9878-c3d8-4794-9585-7ad74ebe7700','d562f7cd-dc86-4075-bd5e-57a47fe613ac','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:44:56 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:44:56.870303');
INSERT INTO "notification_logs" VALUES('1d766143-b142-4201-9a62-ab3198d9581e','6fb9741e-e61e-40be-8e7b-0a218d4d8c81','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:03 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:03.293734');
INSERT INTO "notification_logs" VALUES('78997fb3-bbf8-4b88-b79d-7cfffd0ce7d7','6fb9741e-e61e-40be-8e7b-0a218d4d8c81','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:03 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:03.294361');
INSERT INTO "notification_logs" VALUES('83288c5b-2f30-4030-a6ef-f8355fe14e4f','6fb9741e-e61e-40be-8e7b-0a218d4d8c81','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:03 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:03.294698');
INSERT INTO "notification_logs" VALUES('a9aac0ef-6e37-4ff8-afc4-7f3ff9ca1c9d','582b0d89-0ef2-478a-89c3-084382558867','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:09 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:09.982794');
INSERT INTO "notification_logs" VALUES('80e8975d-a5c7-4347-a83f-852c3300d373','582b0d89-0ef2-478a-89c3-084382558867','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:09 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:09.983152');
INSERT INTO "notification_logs" VALUES('de9baee3-104b-4450-a87f-f9c698b245f4','582b0d89-0ef2-478a-89c3-084382558867','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:09 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:09.983442');
INSERT INTO "notification_logs" VALUES('cccf0f36-f4d1-428b-8bcd-ea9f3616fdfe','baf040be-d425-4a4c-a1b1-c68976d4debe','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:18.956099');
INSERT INTO "notification_logs" VALUES('c1482d09-0ac6-4318-94d5-853c4bfb4bf0','baf040be-d425-4a4c-a1b1-c68976d4debe','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:18.956315');
INSERT INTO "notification_logs" VALUES('00afb3f3-f2a2-4c25-9dfc-b470470c59a8','baf040be-d425-4a4c-a1b1-c68976d4debe','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:18.956402');
INSERT INTO "notification_logs" VALUES('1bd9ae82-483b-4a05-b01d-cfab86106082','2d7ced88-0982-45a9-b818-da9d6820b6ad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:19.072622');
INSERT INTO "notification_logs" VALUES('a6ae1feb-30e5-45b2-af6b-0eeb30b321a6','2d7ced88-0982-45a9-b818-da9d6820b6ad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:19.072790');
INSERT INTO "notification_logs" VALUES('c0969f30-b93e-44d8-9862-dabbdbeaa11f','2d7ced88-0982-45a9-b818-da9d6820b6ad','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:45:18 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:45:19.072871');
INSERT INTO "notification_logs" VALUES('2c41be52-3db0-4093-a627-3cf764990a1e','c8c51331-1211-449d-b370-9342d59f5d5c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:46:02 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:46:02.953170');
INSERT INTO "notification_logs" VALUES('7d40083c-071d-49fd-9c26-82ba887b9589','c8c51331-1211-449d-b370-9342d59f5d5c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:46:02 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:46:02.953292');
INSERT INTO "notification_logs" VALUES('b49a2c5b-2c41-4814-8b86-591b0babbea0','c8c51331-1211-449d-b370-9342d59f5d5c','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:46:02 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:46:02.953353');
INSERT INTO "notification_logs" VALUES('f90ce05e-6d17-4eb6-ad5a-ce0016464a76','d291ea14-a151-4aaa-b81d-d4b769c49f89','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.081675');
INSERT INTO "notification_logs" VALUES('9c1eddf3-4d56-45b3-ae85-8390b0d411fd','d291ea14-a151-4aaa-b81d-d4b769c49f89','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.081854');
INSERT INTO "notification_logs" VALUES('35ec01ed-bb34-4ba4-a956-7ed7a21096c3','d291ea14-a151-4aaa-b81d-d4b769c49f89','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.081958');
INSERT INTO "notification_logs" VALUES('944e9355-875f-4418-bfdb-d3ac0cb8381a','ad9628c9-de85-4717-95f9-e6c042f275bd','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Mother (அம்மா)','+91 98401 11223','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.157108');
INSERT INTO "notification_logs" VALUES('81018b2e-7137-4f17-b5fb-9725dd2655fa','ad9628c9-de85-4717-95f9-e6c042f275bd','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Ananya (Sister)','+91 94440 55667','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.157243');
INSERT INTO "notification_logs" VALUES('34d32390-578c-4373-b880-d33aec8e5908','ad9628c9-de85-4717-95f9-e6c042f275bd','0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya (Friend)','+91 91234 56789','SMS','FAILED','🚨 SOS EMERGENCY ALERT!

I need help immediately. Please contact me and take action.

My current location:
https://www.google.com/maps?q=10.954400,76.993800

Please call me immediately.
Time: 2026-10-20 12:51:32 UTC','TWILIO_CONFIG_ERROR','TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment.','2026-10-20 12:51:32.157307');
CREATE TABLE streetlight_segments (
	id VARCHAR NOT NULL, 
	street_name VARCHAR NOT NULL, 
	jurisdiction VARCHAR, 
	start_latitude FLOAT NOT NULL, 
	start_longitude FLOAT NOT NULL, 
	end_latitude FLOAT NOT NULL, 
	end_longitude FLOAT NOT NULL, 
	lighting_status VARCHAR, 
	total_lights INTEGER, 
	functional_lights INTEGER, 
	is_verified BOOLEAN, 
	source VARCHAR, 
	last_inspected_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO "streetlight_segments" VALUES('4d1c08bd-c730-4803-b71a-f8b6d6bdaa00','EVR Periyar High Road Corridor','Central Zone',13.082,80.27,13.078,80.276,'WELL_LIT',24,24,1,'Authority Smart Metering','2026-10-20 09:26:48.220047');
INSERT INTO "streetlight_segments" VALUES('31f42036-2aea-4c8e-8d7c-742fdca07eae','Central Metro Transit Walkway','Central Zone',13.081,80.2725,13.084,80.2745,'WELL_LIT',16,16,1,'Authority Inspection','2026-10-20 09:26:48.220057');
INSERT INTO "streetlight_segments" VALUES('0c341d5b-beca-4d5a-bf5e-46bc5225af33','Sydenhams Commercial Crossway','Central Zone',13.0835,80.269,13.086,80.267,'MODERATELY_LIT',12,9,1,'Municipal Census','2026-10-20 09:26:48.220064');
INSERT INTO "streetlight_segments" VALUES('dee74720-6e26-4eef-8f62-84e25452f874','Park Town Southern Lane','Central Zone',13.077,80.275,13.075,80.279,'POORLY_LIT',10,4,0,'Community Report','2026-10-20 09:26:48.220068');
INSERT INTO "streetlight_segments" VALUES('a19c5a05-f016-413e-8902-d2bc3f181078','Race Course Illuminated Promenade & Walkway','Coimbatore Central',11.0028,76.976,11.007,76.9805,'WELL_LIT',45,45,1,'Smart City GIS','2026-10-20 13:01:55.139531');
INSERT INTO "streetlight_segments" VALUES('bbc7e7d5-a66c-4882-8fb8-e9efdcfe6c76','Trichy Road Safety Corridor (Collectorate to Singanallur)','Coimbatore Central',11.0005,76.968,10.9975,77.012,'WELL_LIT',70,68,1,'Corporation Lighting Grid','2026-10-20 13:01:55.139543');
INSERT INTO "streetlight_segments" VALUES('b7d55bf3-feb5-4fe7-98a1-111eb8e7e8ba','DB Road RS Puram Commercial Corridor','Coimbatore West',11.008,76.95,11.015,76.952,'WELL_LIT',36,35,1,'West Zone GIS','2026-10-20 13:01:55.139547');
CREATE TABLE users (
	id VARCHAR NOT NULL, 
	name VARCHAR NOT NULL, 
	email VARCHAR NOT NULL, 
	hashed_password VARCHAR NOT NULL, 
	phone VARCHAR, 
	role VARCHAR NOT NULL, 
	jurisdiction VARCHAR, 
	badge_number VARCHAR, 
	is_active BOOLEAN, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
INSERT INTO "users" VALUES('52d03d73-9539-451c-989a-9729c55a52d8','Chief Administrator','admin@rakai.safe','$2b$12$XBnG.2HiBBUofSl11RcV9uoIitEjCFjVbmtqc9F1KN9DMmhAeXj0m','+91 90000 00001','ADMIN','All Zones',NULL,1,'2026-10-20 09:26:47.386975','2026-10-20 09:26:47.386981');
INSERT INTO "users" VALUES('39fe0e80-4181-4661-a444-f36789fba696','Inspector Rajan','police@rakai.safe','$2b$12$eJwZPWX2XBl2Gz/XsJj/eO93l4ejZLytlAdZN.w8Ha.hhwIkVvdu.','+91 94440 10001','POLICE','Central Zone','TN-POL-7821',1,'2026-10-20 09:26:47.800116','2026-10-20 09:26:47.800120');
INSERT INTO "users" VALUES('0d16511f-f4f4-46c3-8a65-7a75a2854b9b','Priya Sharma','user@rakai.safe','$2b$12$aXeKYczQPxP2MwZgt9M3POe4CxwCBRLTReDl3eGYjkaX6MCo7p2W2','+91 98401 23456','USER','Central Zone',NULL,1,'2026-10-20 09:26:48.188925','2026-10-20 09:26:48.188928');
CREATE INDEX ix_users_role ON users (role);
CREATE UNIQUE INDEX ix_users_email ON users (email);
CREATE INDEX ix_users_jurisdiction ON users (jurisdiction);
CREATE INDEX ix_streetlight_segments_street_name ON streetlight_segments (street_name);
CREATE INDEX ix_emergency_contacts_user_id ON emergency_contacts (user_id);
CREATE INDEX ix_emergency_incidents_created_at ON emergency_incidents (created_at);
CREATE INDEX ix_emergency_incidents_jurisdiction ON emergency_incidents (jurisdiction);
CREATE INDEX ix_emergency_incidents_assigned_police_id ON emergency_incidents (assigned_police_id);
CREATE INDEX ix_emergency_incidents_status ON emergency_incidents (status);
CREATE INDEX ix_emergency_incidents_user_id ON emergency_incidents (user_id);
CREATE UNIQUE INDEX ix_location_sharing_sessions_token ON location_sharing_sessions (token);
CREATE INDEX ix_location_sharing_sessions_user_id ON location_sharing_sessions (user_id);
CREATE INDEX ix_infrastructure_places_category ON infrastructure_places (category);
CREATE INDEX ix_infrastructure_places_jurisdiction ON infrastructure_places (jurisdiction);
CREATE INDEX ix_audit_events_created_at ON audit_events (created_at);
CREATE INDEX ix_audit_events_user_id ON audit_events (user_id);
CREATE INDEX ix_audit_events_action ON audit_events (action);
CREATE INDEX ix_incident_location_snapshots_incident_id ON incident_location_snapshots (incident_id);
CREATE INDEX ix_notification_logs_status ON notification_logs (status);
CREATE INDEX ix_notification_logs_user_id ON notification_logs (user_id);
CREATE INDEX ix_notification_logs_created_at ON notification_logs (created_at);
CREATE INDEX ix_notification_logs_incident_id ON notification_logs (incident_id);
COMMIT;
