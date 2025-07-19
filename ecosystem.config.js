module.exports = {
  apps: [
    {
      name: 'my-nest-app', // 애플리케이션 이름
      script: 'dist/main.js', // NestJS 앱 실행 스크립트

      // 클러스터 모드 설정
      instances: 'max', // 사용 가능한 모든 CPU 코어를 사용
      exec_mode: 'cluster', // 클러스터 모드로 실행

      // 기타 옵션
      autorestart: true, // 앱 비정상 종료 시 자동 재시작
      watch: false, // 파일 변경 감지 비활성화 (프로덕션에서는 false 권장)
      max_memory_restart: '1G', // 메모리 한도 초과 시 자동 재시작

      // 환경 변수
      env: {
        NODE_ENV: 'development',
        // 여기에 필요한 다른 환경 변수 추가
      },
    },
  ],
};
