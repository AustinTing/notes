#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
  int x = 1;
  printf("main pid(%i): x: %i\n", (int)getpid(), x);
  int rc = fork();
  if (rc < 0)
  {
    fprintf(stderr, "fork failed\n");
    exit(1);
  }
  else if (rc == 0)
  {
    printf("pid(%i): x: %i\n", (int)getpid(), x);
    // x = 2;
    // printf("pid(%i): after change: x: %i\n", (int)getpid(), x);

  }
  else
  { 
    // wait(NULL);
    // x = 2;
    printf("pid(%i): x: %i\n", (int)getpid(), x);
  }
  return 0;
}