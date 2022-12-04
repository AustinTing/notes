#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
  int status;
  printf("main pid(%i)\n", (int)getpid());
  int rc = fork();
  printf("main, rc: %i\n", rc);

  if (rc < 0)
  { 
    fprintf(stderr, "fork failed\n");
    exit(1);
  }
  else if (rc == 0)
  { 
    printf("pid(%i)\n", (int)getpid());
  }
  else
  {
    int waitResult = waitpid(rc, NULL, 0);
    printf("pid(%i): wait: %i\n", (int)getpid(), waitResult);
    // printf("pid(%i)\n", (int)getpid());
  }
  return 0;
}
