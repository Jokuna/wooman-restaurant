@echo off
set s=�۾��� �Ϸ�Ǿ����ϴ�. â�� �ݾ��ּ���.
cd ../frontend
del /s /q node_modules package-lock.json build
rmdir /s /q node_modules build
npm install && npm run build && echo %s% && pause > nul
